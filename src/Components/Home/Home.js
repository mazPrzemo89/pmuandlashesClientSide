import React, { useState, useEffect } from 'react'

import styles from '../../styles/shared.module.css'
import { getCategories } from '../../APIs/categoryApi'
import { getPromotions } from '../../APIs/promotionsApi'
import Category from '../Category&Product/Category/Category'
import Spinner from '../Utils/loadingIcon/loading'
import Layout from '../Layout/Layout'




function Home() {

    const [categories, setCategories] = useState(false)
    const [promotions, setPromotions] = useState(false)
    const [error, setError] = useState(false)




    const loadCategories = () => {
        getCategories().then(data => {
            console.log(data)
            if (data.error) {
                setError(data.error)
            } else {
                setCategories(data.data)
            }
        })
    }

    const loadPromotions = () => {
        getPromotions().then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                if (data.length > 0)
                    setPromotions(true)
                else {
                    setPromotions(false)
                }
            }
        })
    }




    useEffect(() => {
        loadCategories()
        loadPromotions()

    }, [])


    const categoriesJSX = () => {
        return (
            <div className={styles.gridCards} style={promotions.length > 0 ? { marginTop: '30px' } : { marginTop: '0px' }}>
                {categories && categories.map((category, i) => (
                    <Category key={i} category={category}>{category.name}</Category>
                ))}
                <div className={styles.pusherDiv}></div>
            </div>
        )
    }

    const promotionMessage = () => {
        return (
            <div className={styles.promotionMessage}>
                <h1 className={styles.promotionTitle}>New promotions available!</h1>
                <div className={styles.promotionLink}>
                    <a href='/promotions' >check out now</a>
                </div>
            </div>
        )
    }

    const separator = () => {
        return (
            <div className={styles.promotionMessage}></div>
        )
    }


    return (<Layout>
        {promotions ? promotionMessage() : separator()}
        {!categories && <Spinner />}
        {categoriesJSX()}
    </Layout>
    )
}

export default Home