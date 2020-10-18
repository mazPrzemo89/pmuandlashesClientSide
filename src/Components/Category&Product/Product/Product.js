import React from 'react'
import { useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
import AUX from '../../Utils/aux/Aux'
import classes from './Product.module.css'

const Product = ({product}) => {
    const dispatch = useDispatch()
    const setProductData = () => {
        dispatch({ type: 'SET_PRICE',value: product.price})
        dispatch({ type: 'SET_TREATMENT',value: product.name})
        dispatch({ type: 'SET_DURATION',value: product.duration})

        if(window.location.pathname === '/calendar'){
            window.location.reload()
        }
    }

    return (
        <AUX>
            <div className={classes.productMain}>
                <div className={classes.product}>
                <h2 className={classes.title}>{product.name}</h2>
                    <img alt='product' className={classes.photo} src={product.photo}/>
                    <div className={classes.descDiv}>
                    <p>Price: £{product.price}</p>
                    <p>Duration: {product.duration < 3 ? `${product.duration*20}mins` : `${Math.floor(product.duration/3)}hr ${product.duration%3*20 > 0 ? `${product.duration%3*20}mins` : ``}`}</p>
                    <p className={classes.productDescription}>{product.description}</p>
                    </div>
                    <Link to="/calendar" className={classes.link}>
                        <button className={classes.productButton}  onClick={()=>{setProductData();window.scroll(0,5)}} >
                            Book appointment
                        </button>
                    </Link> 
                </div>
                <div className={classes.bottom}></div>
            </div>
        </AUX>
    )
}

export default Product