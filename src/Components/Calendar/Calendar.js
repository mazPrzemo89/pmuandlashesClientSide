import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import Layout from '../Layout/Layout'
import PhoneInput from 'react-phone-number-input/input'
import { isValidPhoneNumber } from 'react-phone-number-input'
import stylesCalPage from './CalendarPage.module.css'
import stylesMain from './Calendar.module.css'
import { isAuthenticated } from '../../auth'
import { getProductPrice, getProducts } from '../../APIs/productsApi'
import { setDbMonth } from '../../APIs/calendarApi'
import { bookingValidation, dbDateHandler, updateMonth } from './calendarMethods'
import { getBookingTimes, bookAppointment } from '../../APIs/bookingApi'
import { getBookingTimesCustom, setHoliday } from '../../APIs/adminApi'
import { sendSMS, scheduleSMS } from '../../APIs/smsApi'
import CheckoutForm from '../CheckoutForm/CheckoutForm'
import times from '../../bookings';

const Calendar = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const auth = isAuthenticated()

    const [userRole, setRole] = useState(0)
    const [day, setDay] = useState(new Date().getDate())
    const [month, setMonth] = useState(new Date().getMonth() + 1)
    const [year, setYear] = useState(new Date().getFullYear())
    const [error, setError] = useState(false)
    const [calData, setCalData] = useState([])
    const [phone, setPhone] = useState('')
    const [name, setName] = useState('')
    const [dbDate, setDbDate] = useState('')
    const [treatmentString, setTreatmentString] = useState('')
    const [isAllBookes, setIsAllBooked] = useState(false)
    const [priceString, setPriceString] = useState(0)
    const [depositChecked, setCheckedDeposit] = useState(false)
    const [fullPriceChecked, setCheckedFull] = useState(false)
    const [gridLength, setGridLength] = useState(0)
    const [durationString, setDurationString] = useState('')
    const [randomNumber, setRandomNumber] = useState(0)
    const [products, setProducts] = useState([])

    const duration = useSelector(state => state.duration)
    const treatment = useSelector(state => state.treatment)
    const price = useSelector(state => state.price)



    const [timesToBook, setTimesToBook] = useState([
        { bookings: [] },
        { bookings: [] },
        { bookings: [] },
        { bookings: [] },
        { bookings: [] },
        { bookings: [] },
        { bookings: [] },
        { bookings: [] }
    ])
    const [dbTimes, setDbTimes] = useState([])
    const [radioButton, setRadioButton] = useState('')

    useEffect(() => {

        if (auth) {
            setRole(auth.user.role)
            getProducts().then(data => {
                setProducts(data)
            })
        }

        setRandomNumber(`${Math.ceil(Math.random() * 10) * Math.ceil(Math.random() * 10) + Math.ceil(Math.random() * 10) + Math.ceil(Math.random() * 10) * Math.ceil(Math.random() * 10) * 200 * 2}`)

        let time = parseInt(duration);


        setDbDate(dbDateHandler(month))
        setTreatmentString(treatment !== '' ? treatment : 'Please select a treatment');
        setDurationString(duration > 0 ? time < 3 ? `${time * 20}mins` : `${Math.floor(time / 3)}h ${time % 3 * 20 > 0 ? `${time % 3 * 20}mins` : ``}` : 'No treatment selected')

        getBookingTimesCustom().then(data => {
            for (let i = 0; i < data.length; i++) {
                const ttbCopy = timesToBook
                let day = data[i].day
                switch (day) {
                    case "default":
                        ttbCopy[7].bookings = data[i].bookings
                        setTimesToBook(ttbCopy)
                        break;
                    case "monday":
                        ttbCopy[1].bookings = data[i].bookings
                        setTimesToBook(ttbCopy)
                        break;
                    case "tuesday":
                        ttbCopy[2].bookings = data[i].bookings
                        setTimesToBook(ttbCopy)
                        break;
                    case "wednsday":
                        ttbCopy[3].bookings = data[i].bookings
                        setTimesToBook(ttbCopy)
                        break;
                    case "thursday":
                        ttbCopy[4].bookings = data[i].bookings
                        setTimesToBook(ttbCopy)
                        break;
                    case "friday":
                        ttbCopy[5].bookings = data[i].bookings
                        setTimesToBook(ttbCopy)
                        break;
                    case "saturday":
                        ttbCopy[6].bookings = data[i].bookings
                        setTimesToBook(ttbCopy)
                        break;
                    case "sunday":
                        ttbCopy[0].bookings = data[i].bookings
                        setTimesToBook(ttbCopy)
                        break;
                    default:
                }
            }
        })
        setTimesToBook({ ...timesToBook, name: `${year}_${month}_${day.toString().length === 2 ? day : '0' + day}` })
        updateMonth(month, year, setDbMonth, assignClass, setCalData, setError)
        console.log(timesToBook)
    }, [])


    const assignClass = (array) => {
        for (let i = 0; i < array.length; i++) {
            switch (array[i].day) {
                case 0:
                    array[i].style = stylesCalPage.day1sunday;
                    break;
                case 1:
                    array[i].style = stylesCalPage.day1monday;
                    break;
                case 2:
                    array[i].style = stylesCalPage.day1tuesday;
                    break;
                case 3:
                    array[i].style = stylesCalPage.day1wensday;
                    break;
                case 4:
                    array[i].style = stylesCalPage.day1thursday;
                    break;
                case 5:
                    array[i].style = stylesCalPage.day1friday;
                    break;
                case 6:
                    array[i].style = stylesCalPage.day1saturday;
                    break;
                default:

            }



        }
    }

    const toggleHoliday = () => {

        let reqBody = {
            name: (month < 10 ? "0" + month : month) + "_" + year,
            day: day
        }
        setHoliday(reqBody)
        alert('Holiday set')
    }

    const runItNext = () => {
        setDbMonth({
            name: month === 12 ? `01_${year + 1}` : `${month < 9 ? `0${month + 1}` : month + 1}_${year}`,
            month: month === 12 ? '01' : `${month < 9 ? `0${month + 1}` : month + 1}`,
            year: year
        })
            .then((data) => {
                if (data.error) {
                    setError(data.error)
                } else {
                    let calendarMonth;
                    calendarMonth = data.days.map((e) => {
                        return {
                            day: e[0].dayOfWeek,
                            value: e[0].value,
                            date: e[0].date,
                            disabled: e[0].disabled
                        }
                    })
                    assignClass(calendarMonth)
                    setCalData(calendarMonth)
                    setDbDate(dbDateHandler(month + 1))
                    if (month !== new Date().getMonth()) {
                        setDay(1)
                    }

                }
            })
            .catch()

    }

    const runItPrevious = () => {
        setDbMonth({
            name: month === 1 ? `12_${year - 1}` : `${month <= 9 ? `0${month - 1}` : month - 1}_${year}`,
            month: `${month <= 10 ? `0${month - 1}` : month - 1}`,
            year: year
        })
            .then((data) => {
                if (data.error) {
                    setError(data.error)
                } else {
                    let calendarMonth;
                    calendarMonth = data.days.map((e) => {
                        return {
                            day: e[0].dayOfWeek,
                            value: e[0].value,
                            date: e[0].date,
                            disabled: e[0].disabled,
                            holiday: e[0].holiday
                        }
                    })
                    assignClass(calendarMonth)
                    setCalData(calendarMonth)
                    setDbDate(dbDateHandler(month - 1))
                    if (month === new Date().getMonth() + 2) {
                        setDay(new Date().getDate())
                    }
                }
            })
            .catch()
    }

    const nextMonthBtn = () => {
        if (month === 12) {
            setYear(year + 1)
            setMonth(1)
            runItNext()
        } else {
            setMonth(month + 1)
            runItNext()
        }
    }
    const prevMonthBtn = () => {
        if (month === 1) {
            setYear(year - 1)
            setMonth(12)
            runItPrevious()
        } else {
            setMonth(month - 1)
            runItPrevious()
        }
    }


    const payment = () => {

        let bool = false;

        let d = new Date(year, month - 1, day);
        let n = d.getDay();

        times.bookings = timesToBook[n].bookings.length === 0 ? timesToBook[7].bookings : timesToBook[n].bookings
        times.name = `${year}_${month}_${day.toString().length === 2 ? day : '0' + day}`

        getBookingTimes(times).then((timesData) => {
            let bookingsToVal = bookingValidation(duration, timesData, setDbTimes, new Date(year, month - 1, day), userRole)

            for (let i = 0; i < bookingsToVal.bookings.length; i++) {
                if (bookingsToVal.bookings[i][0].time === radioButton && bookingsToVal.bookings[i][0].display === 'flex') {
                    bool = true
                }
            }

            if (bool) {
                bookTime(randomNumber)
                setIsAllBooked(null)

                let messageBody = {
                    destination: phone,
                    content: `Your custom message forwarded to the customer`,
                }

                let confirmationSMS = {
                    destination: 'Your phone number',
                    content: `Your custom confirmation message `
                }
                sendSMS(messageBody)
                sendSMS(confirmationSMS)

                messageBody.day = day
                messageBody.month = month
                messageBody.year = year
                messageBody.content = `Your custom message to schedule`

                scheduleSMS(messageBody)

                dispatch({ type: 'SET_BOOKTIME', value: radioButton })
                dispatch({ type: 'SET_BOOKDATE', value: `${day} ${dbDateHandler(month)} ${year}` })
                dispatch({ type: 'SET_CUSTOMER', value: name })
                history.push('./success')
            } else {
                alert('Ooops someone just booked that time.')
            }
        })

    }


    const loadDbTimes = () => {
        if (year && month && day) {
            const d = new Date(year, month - 1, day);
            const n = d.getDay();
            times.bookings = timesToBook[n].bookings.length === 0 ? timesToBook[7].bookings : timesToBook[n].bookings
            times.name = `${year}_${month}_${day.toString().length === 2 ? day : '0' + day}`
            console.log(times)
            getBookingTimes(times).then(data => {
                let counter = 0
                let bookingsData = bookingValidation(duration, data, setDbTimes, new Date(year, month - 1, day), userRole)
                if (bookingsData) {
                    setIsAllBooked(bookingsData.isBooked)
                    for (let i = 0; i < bookingsData.bookings.length; i++) {
                        if (bookingsData.bookings[i].display === 'flex') {
                            counter++
                        }
                        setGridLength(counter)
                    }
                }
            })
        }
    }

    const checkBookings = () => {
        loadDbTimes()
        window.scrollTo(0, 500)
    }

    const bookTime = (refNum) => {
        let body = {
            name: '',
            bookings: [],
            touched: true
        }

        for (let i = 0; i < dbTimes.length; i++) {
            body.bookings.push(dbTimes[i])
        }
        body.name = `${year}_${month}_${day.toString().length === 2 ? day : '0' + day}`
        for (let i = 0; i < body.bookings.length; i++) {
            if (body.bookings[i].time === radioButton && body.bookings[i].isNotBooked === true) {
                body.bookings[i].isNotBooked = false
                body.bookings[i].type = refNum === 'break' && userRole === 1 ? 'Booked by admin' : treatment
                body.bookings[i].duration = refNum === 'break' && userRole === 1 ? 1 : duration
                body.bookings[i].phone = refNum === ('break' || 'admin book') && userRole === 1 ? phone : phone ? phone : 'admin'
                body.bookings[i].customerName = refNum === ('break' || 'admin book') && userRole === 1 ? name : name ? name : 'admin'
                body.bookings[i].refNumber = refNum === 'break' && userRole === 1 ? '3' : refNum
                body.bookings[i].break = refNum === 'break' && userRole === 1 ? true : 'false'
            }
        }
        bookAppointment(body).then(() => {
            // Redirect to success page
            checkBookings()
        })
    }

    const handleChange = (event) => {
        setName(event.target.value)
    }



    const phoneInput = () => (
        <PhoneInput
            className={stylesMain.formInput}
            value={phone}
            country='GB'
            onChange={setPhone} />
    )

    const nameInput = () => (
        <input
            className={stylesMain.formInput}
            value={name}
            onChange={handleChange} />
    )

    const calendarHeader = () => {
        return (
            <div className={stylesMain.calendarHeader}>
                <p style={{ textAlign: 'center' }}>{dbDateHandler(month)} / {year}</p>
            </div>
        )
    }

    const calendarNavBtns = () => {
        return (
            <div className={stylesMain.calendarNav}>
                <button className={stylesMain.calNavBtn} onClick={prevMonthBtn} disabled={(year === new Date().getFullYear()) && (month === new Date().getMonth() + 1) ? true : false}>Previous month</button>
                <button className={stylesMain.calNavBtn} onClick={nextMonthBtn} disabled={(year === new Date().getFullYear()) && (month === new Date().getMonth() + 3) ? true : false}>Next month</button>
            </div>
        )
    }

    const calendarBody = () => {
        return (
            <div className={stylesCalPage.calendar}>
                <div className={stylesCalPage.dayName}>mon</div>
                <div className={stylesCalPage.dayName}>tue</div>
                <div className={stylesCalPage.dayName}>wen</div>
                <div className={stylesCalPage.dayName}>thu</div>
                <div className={stylesCalPage.dayName}>fri</div>
                <div className={stylesCalPage.dayName}>sat</div>
                <div className={stylesCalPage.dayName}>sun</div>
                {calData && calData.map((e, i) => {
                    return (
                        <button onClick={() => { setDbTimes([]); setDay(e.value) }} key={i} className={e.style} disabled={userRole === 1 ? false : (e.value < new Date().getDate() && (month <= new Date().getMonth() + 1) ? true : (userRole === 1 && e.holiday === true ? false : e.disabled))} style={userRole === 1 && e.holiday === true ? { color: 'red' } : {}} >{e.value}</button>
                    )
                })}
            </div>
        )
    }

    const calendarCheckAvBtn = () => {

        return (
            <div className={stylesMain.centerBtnDiv} >
                {calData.length > 0 && <button className={stylesMain.centeredButton} onClick={() => { checkBookings(); console.log(timesToBook) }} disabled={calData[day - 1].disabled === true ? true : false}>Check availability</button>}
            </div>
        )
    }

    const calendarHolidayBtn = () => {
        return (
            <div className={stylesMain.centerBtnDiv}>
                <button className={stylesMain.centeredButton} onClick={toggleHoliday}>Holiday on/off</button>
            </div>
        )
    }

    const treatmentDate = () => {
        return (
            <p className={stylesMain.calendarParagraph}>Date: {day} / {dbDate && dbDate}</p>
        )

    }

    const bookingTimesList = () => {
        return (
            <div className={stylesMain.bookingsDiv}>
                <ul className={dbTimes.length === 0 ? '' : stylesMain.hoursList} style={{ height: gridLength >= 6 ? '320px' : `${gridLength * 65}px`, marginTop: '0.2rem' }}>

                    {dbTimes && dbTimes.map((arr, i) => {
                        if (arr.time !== "") {
                            return (
                                <li key={i + 'li'} style={{ display: arr.display }}>
                                    <input
                                        type="radio"
                                        name="booking time"
                                        key={i}
                                        id={i}
                                        value={arr.time}
                                        onClick={() => setRadioButton(`${arr.time}`)}
                                    />
                                    <label key={i + 'l'} style={{ display: arr.display, color: arr.color }}>{arr.time} </label>
                                </li>
                            )
                        } else {
                            return ''
                        }
                    })}
                </ul>
            </div>
        )
    }

    const treatmentParagraph = () => (
        <p className={stylesMain.calendarParagraph}> Treatment: {treatmentString}</p>
    )

    const durationParagraph = () => (
        <p className={stylesMain.calendarParagraph}>Duration: {treatment === '' ? 'No treatment Selected' : durationString}</p>
    )

    const adminControls = () => {
        return (
            <div className={stylesMain.adminControls}>
                <button disabled={radioButton ? false : true} className={stylesMain.calNavBtn} onClick={() => { bookTime('break') }} >Break</button>
                <button disabled={radioButton ? false : true} className={stylesMain.calNavBtn} onClick={() => { bookTime('Admin book') }}>Admin book</button>
            </div>
        )
    }

    const userInput = () => {
        return (
            <div className={stylesMain.userInput}>
                <div className={stylesMain.formDiv}>
                    <div className={stylesMain.formField}>
                        <div className={stylesMain.formInput}>Phone: +44 </div>
                        {phoneInput()}
                    </div>
                </div>

                <div className={stylesMain.formDiv}>
                    <div className={stylesMain.formField}>
                        <div className={stylesMain.formInput}>Name:</div>
                        {nameInput()}
                    </div>
                </div>
            </div>
        )
    }


    const paymentDiv = () => {
        return (
            <div className={stylesMain.bottomDiv}>
                {priceString !== 0 && <CheckoutForm refNumber={randomNumber} successFunciton={payment} />}
                <div className={stylesMain.priceDiv}>
                    <label className={stylesMain.price}>Pay deposit: £{15}
                        <input
                            disabled={radioButton ? false : true}
                            type='radio'
                            name="price"
                            checked={depositChecked}
                            onClick={() => {
                                fullPriceChecked === true ? setCheckedFull(false) : setCheckedDeposit(true)
                                if (isValidPhoneNumber(phone)) {
                                    getProductPrice(treatment)
                                        .then((data) => {
                                            setPriceString(15)
                                            setCheckedDeposit(true)
                                        })
                                } else {
                                    alert('Please provide a valid UK phone number')
                                    setCheckedDeposit(false)
                                }

                            }}
                        />
                    </label>
                </div>
            </div>
        )
    }

    const categoriesLink = () => {
        return (
            <div className={stylesMain.linkDiv}>
                <a href='./'>Select treatment</a>
            </div>
        )
    }

    const listFunction = (e) => {

        let values = e.split(",")
        setTreatmentString(values[0])
        setDurationString(values[1])
        dispatch({ type: 'SET_TREATMENT', value: parseInt(values[0]) })
        dispatch({ type: 'SET_DURATION', value: parseInt(values[1]) })


    }

    const adminBook = () => {

        return (

            <select className={stylesMain.treatmentSelect} id={'product select'} onChange={(e) => listFunction(e.target.value)}>
                <option value='null'>Select treatment</option>
                {products.map((product, i) => {

                    let productValue = [product.name, product.duration]


                    return <option key={i} value={productValue}>{product.name}</option>
                })}
            </select>

        )
    }

    return (
        <Layout className={stylesMain.container} >
            {calendarHeader()}
            {calendarNavBtns()}
            {calendarBody()}
            {products.length > 0 && adminBook()}
            {(treatment !== '' && calendarCheckAvBtn()) || (userRole === 1 && calendarCheckAvBtn())}
            {userRole === 1 && calendarHolidayBtn()}
            {treatmentDate()}
            {isAllBookes && <div className={stylesMain.notimes}>No times Available</div>}
            {bookingTimesList()}
            {treatment === '' && categoriesLink()}
            {treatmentParagraph()}
            {durationParagraph()}
            {userRole === 1 && adminControls()}
            {userInput()}
            <div className={stylesMain.conditionsDiv}>
                <p className={stylesMain.conditions}>The deposit is refundable only if you cancel your booking within a 24 hour notice. Changing your booking time or date does not make your deposit refundable. The rest of the amount must be paid by cash, by continuing you agree to the conditions above.</p>
            </div>
            {paymentDiv()}
        </Layout>
    )
}


export default Calendar