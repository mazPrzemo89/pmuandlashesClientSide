import React from 'react'
import {Link} from 'react-router-dom'
import AUX from '../../Utils/aux/Aux'
import classes from '../Category/Category.module.css'

const Category = ({category}) => {
    
  
    return (
        <AUX>
            <div className={classes.productMain}>
                <div className={classes.product}>
                    <div className={classes.descDiv}></div>

                    <div className={classes.titleDiv}>   <h2 className={classes.title}>{category.name}</h2> </div> 
                        <img alt='catrgory' className={classes.photoCateg} src={category.photo}/>
                        <Link to="/Products" className={classes.link} onClick={()=>{localStorage.setItem('_id',category._id)}}>
                            <button className={classes.productButton} >
                                Browse treatments
                            </button>
                        </Link>
                    </div>
                    <div className={classes.bottom}></div>
            </div>
        </AUX>
    )
}

export default Category