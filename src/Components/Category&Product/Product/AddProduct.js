import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import Layout from '../../Layout/Layout'
import { isAuthenticated } from '../../../auth'
import { createProduct } from '../../../APIs/productsApi'
import { getCategories } from '../../../APIs/categoryApi'
import styles from './AddProduct.module.css'

const AddProduct = () => {

    const [values, setValues] = useState({
        name:'',
        description:'',
        price:'',
        duration:'',
        categories:[],
        category:'',
        photo:'',
        loading: false,
        error:'',
        createdProduct:'',
        formData:''
    })

    const {
        name,
        description,
        price,
        duration,
        categories,
        loading,
        error,
        createdProduct,
        formData
    } = values

    // load categories and set form data
    const init = () => {
        getCategories().then(data => {
            if(data.error) {
                setValues({...values, error: data.error})
            } else {
                setValues({...values, categories: data.data, formData: new FormData()})
            }
        })
    }

    useEffect(()=>{
        init()
    },[])

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set( name, value )
        setValues({...values, [name]: value})
    }

    const { user, token } = isAuthenticated()
    const clickSubmit = (event) => {
        event.preventDefault()
        setValues({...values, error: '', loading: true})
        
        createProduct(user._id, token, formData)
        .then(data=>{
            if(data.error) {
                setValues({...values, error: data.error})
            } else {
                setValues({
                    ...values,
                    name:'', 
                    description:'',
                    photo:'',
                    price:'',
                    error: '',
                    duration: '',
                    loading: false,
                    createdProduct: data.name
                })
            }
        })
    }
    

    
    const newPostForm = () => ( 
        <form  onSubmit={clickSubmit} className={styles.formAll}>
            <h3 className={styles.title}>Post Photo</h3>
            <div >
                <label>
                <input 
                    onChange={handleChange('photo')} 
                    type="file" name="photo" 
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

            <div >
                <label >Description</label>
                <textarea
                    className={styles.inputField} 
                    onChange={handleChange('description')} 
                    type="text"  
                    value={description}
                />
            </div>

            <div >
                <label >Duration</label>
                <input 
                    className={styles.inputField}
                    onChange={handleChange('duration')} 
                    type="number" 
                     
                    value={duration}
                />
            </div>

            <div >
                <label >Price</label>
                <input 
                    onChange={handleChange('price')} 
                    type="number" 
                    className={styles.inputField}
                    value={price}
                />
            </div>

            <div >
                <label >Category</label>
                <select onChange={handleChange('category')} >
                    <option>Please select</option>
                    {categories &&
                        categories.map((c, i) => (
                            <option key={i} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                </select>
            </div>
            <button>Submit</button>
        </form>)
    
    const showError = () => (
        <div className={styles.errorMessage} style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    )

    const showSuccess = () => {
            return(
                <div className={styles.successMessage} style={{display: createdProduct ? '' : 'none'}}>
                <h2>{`${createdProduct}`} is created!</h2>
                </div>
            )
    }
     
    

    const showLoading = () => (
        loading && (<div >
            <h2>Loading...</h2>
        </div>)
    )

    const goBack = () => {
        return (
         <div className={styles.wrappingDiv}>
             <Link className={styles.dashLink} to="/admin/dashboard">Back to dashboard</Link>
         </div>
         )
     }

    return (
        <Layout>
            <div className={styles.addProduct}>
                <div>
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    <div className={styles.wrappingDiv}>
                    {newPostForm()}
                    </div>
                    {goBack()}
                </div>
                
            </div>
            
        </Layout>
        )
    }
export default AddProduct