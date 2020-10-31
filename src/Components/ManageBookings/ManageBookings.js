import React, { useState, useEffect } from 'react'
import Layout from '../Layout/Layout'
import { useHistory } from "react-router-dom"
import { isAuthenticated } from '../../auth'
import styles from './ManageBookings.module.css'
import { getBookings, bookAppointment, deleteDay } from '../../APIs/bookingApi'

const ManageBookings = () => {


    const history = useHistory()

    if (!isAuthenticated) {
        history.push('./')
    }

    const [bookings, setBookings] = useState([])
    const [bookedTimes, setBookedTimes] = useState([])
    const [selectedDate, setSelectedDate] = useState('')
    const [deletePopup, setDeletePopup] = useState(false)




    useEffect(() => {
        getBookings().then(data => {
            setBookings(data)
        })
    }, [])

    const togglePopup = () => {
        setDeletePopup(!deletePopup)
    }

    const removeDay = () => {
        deleteDay({ "name": selectedDate }).then(data => {
            alert(data)
            window.location.reload()
        })
    }

    const showTimes = (e, arg) => {
        window.scrollTo(0, 0)
        setSelectedDate(e.target.value)
        for (let i = 0; i < bookings.length; i++) {
            if (bookings[i].name === e.target.value) {
                let hlp = bookings[i].bookings
                let timesHlp = []
                for (let i = 0; i < hlp.length; i++) {
                    if (hlp[i].isNotBooked === false && hlp[i].time !== '--') {
                        timesHlp.push(hlp[i])
                    }
                }
                setBookedTimes(timesHlp)
            }
        }
    }


    const populateBookings = () => {
        return (
            <div className={styles.bookingsGrid}>
                {bookings.map((e, i) => {
                    if (e.touched) {
                        return (
                            <button key={i} onClick={(e) => showTimes(e)} value={e.name}>
                                {e.name.split('_').join(' ')}
                            </button>
                        )
                    }

                })}
            </div>
        )
    }


    const cancelBooking = (e) => {
        let body = {
            name: selectedDate,
            bookings: [],
            touched: true
        }
        for (let i = 0; i < bookings.length; i++) {
            if (bookings[i].name === selectedDate) {
                let bookingsArr = bookings[i].bookings
                for (let i = 0; i < bookingsArr.length; i++) {
                    body.bookings.push(bookingsArr[i])
                }
                for (let i = 0; i < body.bookings.length; i++) {
                    if (body.bookings[i].time === e && body.bookings[i].isNotBooked === false) {
                        body.bookings[i].isNotBooked = true
                        body.bookings[i] = {
                            time: e,
                            type: "",
                            isNotBooked: true,
                            break: false,
                            position: body.bookings[i].position,
                        }
                    }
                }
            }
        }
        if (bookedTimes.length === 1) {
            body.touched = false
            window.location.reload()
        }
        bookAppointment(body).then(() => {
            window.location.reload()
        })
    }

    const bookingsJSX = () => {
        return (
            <div style={{ width: '100%' }}>
                {populateBookings()}
            </div>
        )
    }

    const bookedTimesJSX = () => {
        return (
            <div className={styles.bookedTimesGrid}>
                <h2 className={styles.titleDate}>{selectedDate.split('_').join(' ')}</h2>
                {bookedTimes != 0 && <button onClick={togglePopup} className={styles.deleteButton}>Delete day</button>}
                {bookedTimes && bookedTimes.map((e, i) => {
                    return (
                        <div className={styles.booking} key={i} style={{ margin: '3px' }}>
                            <div>Type: {e.type}</div>
                            <div>Phone: {e.phone}</div>
                            <div>Name: {e.customerName}</div>
                            <div>Ref: {e.refNumber}</div>
                            {e.time} <button onClick={() => cancelBooking(e.time)}>Cancel Booking</button>
                        </div>
                    )
                })}
            </div>
        )
    }

    const deleteConfirmation = () => (
        <div className={styles.deleteConfirmation} style={{ display: deletePopup ? '' : 'none' }}>
            <p className={styles.deleteParagraph}>Are you sure you want to delete <br /> {selectedDate.split('_').join(' ')}</p>
            <div style={{ marginTop: '10px' }}>
                <button onClick={togglePopup} className={styles.confirmationButton}>No</button>
                <button onClick={removeDay} className={styles.confirmationButton}>Yes</button>
            </div>
        </div>
    )

    return (
        <Layout>
            <h1 className={styles.title}>ManageBookings</h1>
            {bookingsJSX()}
            {bookedTimesJSX()}
            {deleteConfirmation()}
        </Layout>
    )
}

export default ManageBookings