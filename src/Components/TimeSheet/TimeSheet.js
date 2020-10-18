import React, { useState, useEffect } from 'react'
import { isAuthenticated } from '../../auth'
import { useHistory } from "react-router-dom"
import AUX from '../Utils/aux/Aux'
import Menu from '../Menu/Menu'
import styles from '../AdminDashboard/adminDashboard.module.css'
import { getBookingTimesDefault, setBookingTimesDefault, getWorkingDays, setWorkingDay, getBookingTimesAll, deleteBookingsTimes } from '../../APIs/adminApi'
import { setBookingTimesAll } from '../../APIs/bookingApi'


const TimeSheet = () => {

    const history = useHistory()

    if (!isAuthenticated) {
        history.push('./')
    }

    function compare(a, b) {

        const timeA = a.time
        const timeB = b.time

        let comparison = 0;
        if (timeA > timeB) {
            comparison = 1;
        } else if (timeA < timeB) {
            comparison = -1;
        }
        return comparison;
    }


    const [checkboxes, setCheckboxes] = useState([])
    const [days, setDays] = useState([])
    const [dayOfWeek, setDayOfWeek] = useState(null)
    const [dayToDelete, setDayToDelete] = useState(null)
    const [allWeekDays, setAllWeekDays] = useState([])

    const [workingDays, setWorkingDays] = useState({
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: true,
        sunday: true
    })

    const [bookTimes, setBookTimes] = useState({
        bookings: null
    })

    const { user, token } = isAuthenticated()


    useEffect(() => {
        getWorkingDays().then((data, err) => {
            setDays(data[0].days)
            setWorkingDays({
                monday: data[0].days[1],
                tuesday: data[0].days[2],
                wednesday: data[0].days[3],
                thursday: data[0].days[4],
                friday: data[0].days[5],
                saturday: data[0].days[6],
                sunday: data[0].days[0]
            })
        })
        getBookingTimesAll().then((data, err) => {
            setAllWeekDays(data)
        })
    }, [])

    const setAllTimeSheet = () => {
        setBookingTimesAll().then((data, err) => {
            if (err) {
                console.log(err)
            }
        })
    }

    const fetchTimes = () => {
        getBookingTimesDefault().then((data, err) => {
            if (err) {
                console.log(err)
            } else if (data.error) {
                alert('Please initialize working times array.')
                return
            } else {
                setBookTimes({ bookings: data })
            }
        })
    }

    const setTimes = (data) => {
        checkboxes.sort(compare);
        data.push({
            time: '',
            type: '',
            isNotBooked: true,
            break: false
        }, {
            time: '',
            type: '',
            isNotBooked: true,
            break: false
        })
        data.unshift({
            time: '',
            type: '',
            isNotBooked: true,
            break: false
        }, {
            time: '',
            type: '',
            isNotBooked: true,
            break: false
        })
        let body = {
            bookings: data,
            day: dayOfWeek
        }
        if (data.length > 8) {
            setBookingTimesDefault(user._id, token, body).then(() => { setDayOfWeek('default'); window.location.reload() })
        }
    }

    const setDay = (event) => {
        const body = days

        body[event.target.id] = !body[event.target.id]

        setWorkingDay(body)
        setTimeout(function () {
            getWorkingDays().then((data, err) => {
                setDays(data[0].days)
                setWorkingDays({
                    monday: data[0].days[1],
                    tuesday: data[0].days[2],
                    wednesday: data[0].days[3],
                    thursday: data[0].days[4],
                    friday: data[0].days[5],
                    saturday: data[0].days[6],
                    sunday: data[0].days[0]
                })
            })
        }, 100);

    }

    const selectDay = (event) => {
        setDayOfWeek(event.target.value)
    }

    const selectDayToDelete = (event) => {
        setDayToDelete(event.target.value)
    }

    const deleteDay = (id) => {
        deleteBookingsTimes(id).then((data, err) => {
            if (err) {
                console.log(err)
            }
        })
    }

    const submitForm = (e) => {
        const value = e.target.value
        const position = e.target.id
        let doesExist = false
        let obj = {
            time: value,
            type: '',
            isNotBooked: true,
            break: false,
            position: parseFloat(position)
        }
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].time === value) {
                doesExist = true
                setCheckboxes(checkboxes.filter(item => item.time !== value))
            }
        }
        if (!doesExist) {
            setCheckboxes(checkboxes.concat(obj))
        }
    }


    const daysTimesBoxes = () => {
        return (
            <select className={styles.daysDropdown} onChange={selectDay}>
                <option value={false}>select day</option>
                <option value="default">Default</option>
                <option value="monday">Monday</option>
                <option value="tuesday">Tuesday</option>
                <option value="wednsday">Wednsday</option>
                <option value="thursday">Thursday</option>
                <option value="friday">Friday</option>
                <option value="saturday">Saturday</option>
                <option value="sunday">Sunday</option>
            </select>
        )
    }

    const deleteDropdown = () => {
        return (
            <select className={styles.daysDropdown} onChange={selectDayToDelete}>
                <option value={null}>select day</option>
                {allWeekDays && allWeekDays.map((el, i) => {
                    if (el) {
                        return (
                            <option key={i} value={el.id}>{el.day}</option>
                        )
                    }
                })}
            </select>
        )
    }

    const dayControlls = () => {

        return <div className={styles.daysDiv}>
            <div className={styles.dayDiv}>
                <h3>Monday</h3>
                <div className={workingDays.monday === true ? styles.dayOn : styles.dayOnActive}> ON</div>
                <div className={workingDays.monday === false ? styles.dayOff : styles.dayOffActive}> OFF</div>
                <button onClick={setDay} id={1}>set</button>
            </div>
            <div className={styles.dayDiv}>
                <h3>Tuesday</h3>
                <div className={workingDays.tuesday === true ? styles.dayOn : styles.dayOnActive}> ON</div>
                <div className={workingDays.tuesday === false ? styles.dayOff : styles.dayOffActive}> OFF</div>
                <button onClick={setDay} id={2}>set</button>
            </div>
            <div className={styles.dayDiv}>
                <h3>Wednesday</h3>
                <div className={workingDays.wednesday === true ? styles.dayOn : styles.dayOnActive}> ON</div>
                <div className={workingDays.wednesday === false ? styles.dayOff : styles.dayOffActive}> OFF</div>
                <button onClick={setDay} id={3}>set</button>
            </div>
            <div className={styles.dayDiv}>
                <h3>Thursday</h3>
                <div className={workingDays.thursday === true ? styles.dayOn : styles.dayOnActive}> ON</div>
                <div className={workingDays.thursday === false ? styles.dayOff : styles.dayOffActive}> OFF</div>
                <button onClick={setDay} id={4}>set</button>
            </div>
            <div className={styles.dayDiv}>
                <h3>Friday</h3>
                <div className={workingDays.friday === true ? styles.dayOn : styles.dayOnActive}> ON</div>
                <div className={workingDays.friday === false ? styles.dayOff : styles.dayOffActive}> OFF</div>
                <button onClick={setDay} id={5}>set</button>
            </div>
            <div className={styles.dayDiv}>
                <h3>Saturday</h3>
                <div className={workingDays.saturday === true ? styles.dayOn : styles.dayOnActive}> ON</div>
                <div className={workingDays.saturday === false ? styles.dayOff : styles.dayOffActive}> OFF</div>
                <button onClick={setDay} id={6}>set</button>
            </div>
            <div className={styles.dayDiv}>
                <h3>Sunday</h3>
                <div className={workingDays.sunday === true ? styles.dayOn : styles.dayOnActive}> ON</div>
                <div className={workingDays.sunday === false ? styles.dayOff : styles.dayOffActive}> OFF</div>
                <button className={styles.dayDivBtn} onClick={setDay} id={0}>set</button>
            </div>
        </div>
    }

    const deleteTimesheet = () => {
        return (
            <AUX>
                <h2 style={{ textAlign: 'center' }}>Delete working hours timesheet</h2>
                <div className={styles.timesControls} style={{ marginBottom: '20px' }}>
                    {deleteDropdown()}
                    <button onClick={() => { deleteDay(dayToDelete) }}>Delete</button>
                </div>
            </AUX>
        )
    }
    console.log(bookTimes)
    const customizeWorkingHours = () => {
        return (
            <AUX>
                <h2 style={{ textAlign: 'center' }}>Set working hours timesheet</h2>
                <div>{daysTimesBoxes()}</div>
                <div className={styles.timesControls}>
                    <button onClick={fetchTimes} disabled={dayOfWeek ? false : true}>Show working hours</button>
                    <button disabled={checkboxes.length >= 4 ? false : true} onClick={() => { setTimes(checkboxes) }}>Save working hours</button>
                    <div className={styles.grid}>
                        {bookTimes.bookings && bookTimes.bookings.map((e, i) => {
                            return (
                                <div key={i}>
                                    <input
                                        type="checkbox"
                                        id={e[0].position}
                                        name={`${e[0].time}`}
                                        value={`${e[0].time}`}
                                        onClick={(e) => submitForm(e)}
                                    />
                                    <label> {`${e[0].time}`}</label>
                                </div>
                            )
                        })
                        }
                    </div>
                </div>
            </AUX>
        )
    }




    return (
        <AUX>
            <Menu />
            <div className={styles.dayControlls}>
                {workingDays && days && dayControlls()}
            </div>
            {deleteTimesheet()}
            {customizeWorkingHours()}
            <button onClick={setBookingTimesAll}>Init times</button>
        </AUX>
    )
}

export default TimeSheet