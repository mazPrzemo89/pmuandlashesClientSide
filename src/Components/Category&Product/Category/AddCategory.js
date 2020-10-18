import React, {useState, useEffect} from 'react'
import Layout from '../../Layout/Layout'
import { isAuthenticated } from '../../../auth'
import {createCategory} from '../../../APIs/categoryApi'
import { Link } from "react-router-dom";
import styles from './AddCategory.module.css'
import stylesDash from '../../AdminDashboard/adminDashboard.module.css'

const AddCategory = () => {
    
   
    const [values, setValues] = useState({
        success:false,
        name:'',
        photo:'',
        error:'',
        loading: false,
        formData:''
    })

    const {
        success,
        error,
        name,
        formData
    } = values


    const init = () => {
        setValues({...values,  formData: new FormData()})
    }

    useEffect(()=>{
        init()
    },[])

    // destructure user and info from localstorage
    const  { user, token } = isAuthenticated()

    const handleChange = name => event => {
        const value = event.target.value;
        formData.set( name, value )
        setValues({...values, [name]: value})
   
    }

    const handlePhoto =  event => {

        const value = event.target.files[0]
        formData.set( 'photo', event.target.files[0] )
        setValues({...values, photo: value})
  
    }

    const clickSubmit = (event) => {
        event.preventDefault()
        
        //setValues({...values, error: '', loading: true})
 
        createCategory(user._id, token, formData)
        .then(data=>{
            if(data.error) {
                setValues({...values, error: data.error.substr(data.error), success: false})
    
            } else {
                setValues({
                    ...values,
                    photo:'',
                    error:'',
                    success:true,
                    loading: false
                })
            }
        })
    }



    const newCategoryForm = () => ( 
        <form className={styles.formAll}  onSubmit={clickSubmit}>
            
            <div >
                <label>
                <input
                    
                    onChange={handlePhoto} 
                    type="file" name='photo'
                    accept="image/*"
                />
                </label>
            </div>
            <div className={styles.inputDiv}>
            <label className={styles.inputLabel}>Name:</label>
                <input 
                    className={styles.inputField}
                    onChange={handleChange('name')} 
                    type="text" 
                    value={name}
                />
            </div>
            <button style={{height:'30px',width:'185px'}} >Submit</button>
        </form>)

    const showSuccess = () => {
        if(success) {
            return <p className={styles.successMessage}>{name} is created</p>
        }
    }

    const showError = () => {
        if(error) {
            return <p className={styles.errorMessage}>{error}</p>
        }
    }

    const goBack = () => {
       return (
        <div className={styles.linkDiv}>
            <Link className={styles.dashLink} to="/admin/dashboard">Back to dashboard</Link>
        </div>
        )
    }

    return (
        <Layout>
            <h3 className={styles.title} style={{marginLeft:'-40px'}}>Post category photo</h3>
            <div className={styles.addCategory}>
                <div>
                    {showSuccess()}
                    {showError()}
                    <div className={styles.wrappingDiv}>
                    
                    </div>
                    
                </div>
                {newCategoryForm()}
            </div>
            {goBack()}
        </Layout>
    )
}

export default AddCategory