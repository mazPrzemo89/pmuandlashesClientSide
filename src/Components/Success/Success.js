import React, { useEffect }from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from "react-router-dom"
import styles from './Success.module.css'
import Layout from '../Layout/Layout'


const Success = () => {
    const history = useHistory()
    const customer = useSelector(state => state.customerName)
    const refNumber = useSelector(state => state.refNumber)
    const bookingTime = useSelector(state => state.bookingTime)
    const bookingDate = useSelector(state => state.bookingDate)

    const successMessage = () => {
        return (
            <div>
            <h1 className={styles.title}>Thank you for booking with Pmu & lash studio {customer}</h1>
            <p className={styles.paragraph}>Your appointment is scheduled for {bookingDate} at {bookingTime} o'clock</p>
            <p className={styles.paragraph}> Your reference number is {refNumber}</p>
            <p className={styles.paragraph}> The adress is 1 gomshall gardens CR8 5AH</p>
            <p className={styles.paragraph}>See you soon and stay beautiful!</p>
            </div>
        )
    }

    useEffect(()=>{
        if(!customer || !bookingTime || !bookingDate) {
            history.push('./')
        }
    },[])

    return (<Layout>
                <div className={styles.succDiv}>
                {customer && bookingTime && bookingDate && successMessage()}
                <div className={styles.pusher}>Pusher Div</div>
                </div>
            </Layout>
            )
}

export default Success