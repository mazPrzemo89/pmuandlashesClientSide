import React, { useState, useEffect }from 'react'
import { getPromotions } from '../../APIs/promotionsApi'
import styles from './Promotions.module.css'
import Layout from '../Layout/Layout'


const Promotions = () => {

    const [promotions, setPromotions] = useState([])
 

    const loadPromotions = () => {
        getPromotions().then(data=>{
            if(data.error) {
                console.log(data.error)
            } else {
                setPromotions(data)
            }
        })
    }

    const renderPromotins = () => {
        if (promotions.length > 0){
            return (
                promotions.map((el, i)=>{
                    return (<div key={i} className={styles.promotionsDiv}>
                                <h2 className={styles.promotionName}>{el.title}</h2>
                                <div>{el.text}</div>
                            </div>)
                })
            )
        }

    }

    const noPromotions = () => {
        if (promotions.length === 0) {
            return <h2 className={styles.promotionsDiv}>No promotions available</h2>
        } 
    }

    useEffect(()=>{
        loadPromotions()
    },[])

    return (<Layout>
                <h1 className={styles.promotionsTitle}>Promotions</h1>
                {promotions && renderPromotins()}
                {noPromotions()}
                <div className={styles.linkDiv}>
                <a href='./'>back to categories</a>
                <div className={styles.pusher}>Pusher Div</div>
                </div>
            </Layout>
            )
}

export default Promotions