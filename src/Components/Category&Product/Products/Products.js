import React, { useState, useEffect } from 'react'
import Layout from '../../Layout/Layout'
import Product from '../Product/Product'
import Spinner from '../../Utils/loadingIcon/loading'
import styles from './Products.module.css'
import stylesShared from '../../../styles/shared.module.css'
import { getProductsByCategory } from '../../../APIs/productsApi'


const Products = () => {

    const [products, setProducts] = useState(null)
    const [error, setError] = useState(false)



    const getProducts = () => {
        getProductsByCategory(localStorage.getItem('_id'))
            .then((data) => {
                if (data.error) {
                    setError(data.error)
                } else {
                    setProducts(data)
                    console.log(data)
                }
            })
            .catch()
    }
    useEffect(() => {
        getProducts()
        window.scrollTo(0, 50)
    }, [])

    return (<Layout>

        <div className={styles.separator}></div>
        <div className={stylesShared.gridCardsProducts}>
            {products && products.map((product, index) => {
                return <Product key={index} product={product} />
            })}
        </div>
        {products && products.length === 0 && <div style={{ minHeight: '68vh', textAlign: 'center' }}><h1>No products for this category found.</h1></div>}
        {!products && <Spinner />}
        <div style={{ width: '200px', height: '80px' }}></div>
    </Layout>)
}

export default Products