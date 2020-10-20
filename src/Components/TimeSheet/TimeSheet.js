import React, { useState, useEffect } from 'react'
import { isAuthenticated } from '../../auth'
import AUX from '../Utils/aux/Aux'
import Menu from '../Menu/Menu'
import styles from '../AdminDashboard/adminDashboard.module.css'
import { getBookingTimesDefault, setBookingTimesDefault, getWorkingDays, setWorkingDay, getBookingTimesAll, deleteBookingsTimes } from '../../APIs/adminApi'
import { setBookingTimesAll } from '../../APIs/bookingApi'
import { hours } from './timesFunction'


const TimeSheet = () => {

    const { user, token } = isAuthenticated()
    const [startingTime, setStartingTime] = useState('')
    const [endTime, setEndTime] = useState('')

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


    // const fetchTimes = () => {
    //     getBookingTimesDefault().then((data, err) => {
    //         if (err) {
    //             console.log(err)
    //         } else if (data.error) {
    //             alert('Please initialize working times array.')
    //             return
    //         } else {
    //             setBookTimes({ bookings: data })
    //         }
    //     })
    // }

    const setTimes = () => {
        let data = hours(startingTime, endTime)
        let body = {
            bookings: data,
            day: dayOfWeek
        }
        //console.log(hours(startingTime, endTime))
        setBookingTimesDefault(user._id, token, body).then(() => { setDayOfWeek('default'); window.location.reload() })

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

    const getStartingTime = (event) => {
        setStartingTime(event.target.value)
    }

    const getEndTime = (event) => {
        setEndTime(event.target.value)
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

    const hoursDropdown = (onclick, value) => {
        return (
            <select className={styles.daysDropdown} onChange={onclick}>
                <option value="" disabled selected>{value}</option>
                <option value="06:00">06:00</option>
                <option value="07:00">07:00</option>
                <option value="08:00">08:00</option>
                <option value="09:00">09:00</option>
                <option value="10:00">10:00</option>
                <option value="11:00">11:00</option>
                <option value="12:00">12:00</option>
                <option value="13:00">13:00</option>
                <option value="14:00">14:00</option>
                <option value="15:00">15:00</option>
                <option value="16:00">16:00</option>
                <option value="17:00">17:00</option>
                <option value="18:00">18:00</option>
                <option value="19:00">19:00</option>
                <option value="20:00">20:00</option>
                <option value="21:00">21:00</option>
                <option value="22:00">22:00</option>
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

    const customizeWorkingHours = () => {
        return (
            <AUX>
                <h2 style={{ textAlign: 'center' }}>Set working hours timesheet</h2>
                <div>{daysTimesBoxes()}</div>
                <div className={styles.timesControls}>
                    {hoursDropdown(getStartingTime, 'select starting time')}
                    {hoursDropdown(getEndTime, 'select end time')}
                    {/* <button onClick={fetchTimes} disabled={dayOfWeek ? false : true}>Show working hours</button> */}
                    <button onClick={() => { setTimes() }}>Save working hours</button>
                    <button onClick={() => { console.log(startingTime, endTime) }}>Log times</button>
                    {/* <div className={styles.grid}>
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
                    </div> */}
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