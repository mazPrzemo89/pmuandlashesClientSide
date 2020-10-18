import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../../auth'
import AUX from '../Utils/aux/Aux'
import Menu from '../Menu/Menu'
import styles from './adminDashboard.module.css'
import { uploadPhoto } from '../../APIs/photoApi'
import { getProducts, deleteProduct, getProductById, updateProduct } from '../../APIs/productsApi'
import { getCategories, getCategory, deleteCategory, updateCategory } from '../../APIs/categoryApi'
import { getPromotions, deletePromotion, setPromotion } from '../../APIs/promotionsApi'

const AdminDashboard = () => {

    const { user, token } = isAuthenticated()
    const [productId, setProductId] = useState('')
    const [products, setProducts] = useState([])
    const [promotions, setPromotions] = useState([])
    const [promotionId, setPromotionId] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [categories, setCategories] = useState([])
    const [showUpdateFrom, setShowUpdateForm] = useState(false)
    const [showUpdateCategoryFrom, setShowUpdateCategoryForm] = useState(false)
    const [catError, setCatError] = useState('')
    const [prodError, setProdError] = useState('')

    const [updateProductValues, setUpdateProductValues] = useState({
        name: '',
        description: '',
        price: '',
        duration: '',
        category: '',
        oldPhoto: '',
        photo: '',
        id: '',
        updateProductForm: ''
    })

    const [updateCategoryValues, setUpdateCategoryValues] = useState({
        name: '',
        oldPhoto: '',
        photo: '',
        id:'',
        updateCategoryForm: ''
    })

    const { updateCategoryForm } = updateCategoryValues

    const { updateProductForm } = updateProductValues

    const [promotionValues, setPromotionValues] = useState({
        title: '',
        text: '',
        error: '',
        success: false
    })

    const [values, setValues] = useState({
        success: '',
        name: '',
        image: '',
        error: '',
        loading: false,
        formData: ''
    })

    const {
        success,
        error,
        name,
        formData
    } = values

    const init = () => {
        setValues({ ...values, formData: new FormData() })
        setUpdateProductValues({ ...updateProductValues, updateProductForm: new FormData() })
        setUpdateCategoryValues({ ...updateCategoryValues, updateCategoryForm: new FormData() })
    }

    const handleChange = name => event => {
        const value = event.target.value;
        formData.set(name, value)
        setValues({ ...values, [name]: value })

    }

    const handleChangePromotions = name => event => {
        const value = event.target.value;
        setPromotionValues({ ...promotionValues, [name]: value })

    }

    const handlePhoto = event => {

        const value = event.target.files[0]
        formData.set('image', event.target.files[0])
        setValues({ ...values, image: value })

    }

    const fetchProduct = () => {
        getProductById(productId).then((data, err) => {
            updateProductForm.set('name', data.name)
            updateProductForm.set('description', data.description)
            updateProductForm.set('price', data.price)
            updateProductForm.set('duration', data.duration)
            updateProductForm.set('category', data.category)
            updateProductForm.set('oldPhoto', data.photo)
            setUpdateProductValues({
                ...updateProductValues,
                name: data.name,
                description: data.description,
                price: data.price,
                duration: data.duration,
                category: data.category,
                oldPhoto: data.photo
            })
            setShowUpdateForm(true)
        })
    }

    const fetchCategory = () => {
        getCategory(categoryId).then((data, err) => {
            if(err){
                console.log(err)
            }
            updateCategoryForm.set('name', data.name)
            updateCategoryForm.set('oldPhoto', data.photo)
            updateCategoryForm.set('id', data.id)
      
            setUpdateCategoryValues({
                ...updateCategoryValues,
                name: data.name,
                oldPhoto: data.photo
            })
            setShowUpdateCategoryForm(true)

        })
    }

    const clickSubmit = (event) => {
        event.preventDefault()
        uploadPhoto(user._id, token, formData)
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                    setValues({ ...values, error: data.error })
                } else {
                    setValues({
                        ...values,
                        success: true,
                        name: data.name,
                        error: '',
                        image: '',
                        loading: false
                    })
                }
            })
    }

    const submitPromotion = (event) => {
        event.preventDefault()
        setPromotion(user._id, token, promotionValues).then(data => {
            if (data.error) {
                setPromotionValues({ ...promotionValues, error: data.error, success: false })
                console.log(error)
            } else {
                setPromotionValues({
                    ...promotionValues,
                    error: '',
                    title: '',
                    text: '',
                    success: true,
                    loading: false
                })
            }
        })
    }



    const showSuccess = () => {
        if (success) {
            return <h3 className={styles.successMessage}>{name} is created</h3>
        }
    }

    const showPromotionSuccess = () => {
        if (promotionValues.success) {
            return <h3 className={styles.successMessage}>Promotion created</h3>
        }
    }

    const showError = () => {
        if (error) {
            return <h3 className={styles.errorMessage}>{error}</h3>
        }
    }

    const showCategoryError = () => {
        if (catError !== '') {
            return <h3 className={styles.errorMessage}>{catError}</h3>
        }
    }

    const showProductError = () => {
        if (prodError !== '') {
            return <h3 className={styles.errorMessage}>{prodError}</h3>
        }
    }

    const showPromotionError = () => {
        if (promotionValues.error) {
            return <h3 className={styles.errorMessage}>{promotionValues.error}</h3>
        }
    }

    const loadCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setCategories(data.data)
            }
        })
    }

    const loadProducts = () => {
        getProducts().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setProducts(data)
            }
        })
    }


    const loadPromotions = () => {
        getPromotions().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setPromotions(data)
            }
        })
    }

    const hnadleDeleteProduct = (id) => {
        deleteProduct(user._id, token, id).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                loadProducts()
            }
        })
    }

    const hnadleDeleteCayegory = (id) => {
        deleteCategory(user._id, token, id).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                loadCategories()
            }
        })
    }

    const hnadleDeletePromotion = (id) => {
        deletePromotion(user._id, token, id).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setPromotionId('')
                loadPromotions()
            }
        })
    }

    const submitUpdateProduct = (event) => {
        event.preventDefault()
        updateProductForm.set('id', productId)
        updateProduct(updateProductForm).then((err, data) => {
            if (err) {
                setProdError(err.error)
                setShowUpdateForm(false)
            } else {
                setUpdateProductValues({
                    name: '',
                    description: '',
                    price: '',
                    duration: '',
                    category: '',
                    oldPhoto: '',
                    photo: '',
                })
                setProdError('')
                setShowUpdateForm(false)
                let formField = document.getElementById('product select')
                formField.value = 'Please select'
            }
        })
      
    }

    const submitUpdateCategory = (event) => {
        event.preventDefault()
        updateCategoryForm.set('id', categoryId)
        updateCategory(updateCategoryForm).then((err, data) => {
            if (err) {
                console.log(err)
                setShowUpdateCategoryForm(false)
                setCatError(err.error)
                let formField = document.getElementById('category select')
                formField.value = 'Please select'
            } else {
                setUpdateProductValues({
                    name: '',
                    oldPhoto: '',
                    photo: '',
                })
                setShowUpdateCategoryForm(false)
                setCategoryId('')
                let categoryField = document.getElementById('category select')
                categoryField.value = 'Please select'
            }
 
        })
    }

    useEffect(() => {
        loadCategories()
        loadProducts()
        loadPromotions()
        init()
    }, [])

    const handleUpdate = name => event => {
        const value = event.target.value;
        updateProductForm.set(name, value)
        setUpdateProductValues({ ...updateProductValues, [name]: value })
    }

    const handleUpdatePhoto = event => {
        const value = event.target.files[0]
        updateProductForm.set('photo', event.target.files[0])
        setUpdateProductValues({ ...updateProductValues, photo: value })

    }

    const handleCategoryPhoto = event => {
        const value = event.target.files[0]
        updateCategoryForm.set('photo', event.target.files[0])
        setUpdateCategoryValues({ ...updateCategoryValues, photo: value })
    }

    const handleCategoryName = name => event => {
        const value = event.target.value;
        updateCategoryForm.set(name, value)
        setUpdateCategoryValues({ ...updateCategoryValues, [name]: value })
    }

    const updateCategoryFormJSX = () => ( 
        <div className={styles.updateDiv}>
        <form className={styles.formAll} onSubmit={submitUpdateCategory}>
            <div className={styles.updateDiv}>
                <label>
                <input
                    onChange={(event) => handleCategoryPhoto(event)} 
                    type="file" name='photo'
                    accept="image/*"
                />
                </label>
            </div>
            <p className={styles.categoryName}>Category name:</p>
            <div className={styles.updateDiv}>
                <input 
                    onChange={handleCategoryName('name')} 
                    type="text" 
                    style={{height:'30px'}} 
                    value={updateCategoryValues.name}
                />
            </div>
            <button style={{height:'30px',width:'185px'}} >Save</button>
            <p className={styles.promParagraph} style={{marginBottom:'20px', marginTop:'10px',borderBottom:'1px solid black'}}>Update category</p>
        </form>
    
        </div>)

    const updateProductFormJSX = () => (
        
        <div className={styles.updateDiv}>
        
        <form onSubmit={submitUpdateProduct} className={styles.formAll}>
            <div className={styles.updateDiv}>
                <label className={styles.controlsSelect}>
                    <input
                        className={styles.controlsSelect}
                        onChange={(event) => handleUpdatePhoto(event)}
                        type="file" name="photo"
                        accept="image/*"
                    />
                </label>
            </div>
            <p className={styles.updateParagraph}>Name:</p>
            <div className={styles.updateDiv}>
                <input

                    onChange={handleUpdate('name')}
                    type="text"
                    value={updateProductValues.name}
                />

            </div>
            <p className={styles.updateParagraph}>Description:</p>
            <div className={styles.updateDiv}>
                <textarea
                    className={styles.inputField}
                    onChange={handleUpdate('description')}
                    type="text"
                    value={updateProductValues.description}
                />
            </div>
            <p className={styles.updateParagraph}>Duration:</p>
            <div className={styles.updateDiv}>
                <input
                    className={styles.inputField}
                    onChange={handleUpdate('duration')}
                    type="number"

                    value={updateProductValues.duration}
                />
            </div>
            <p className={styles.updateParagraph}>Price:</p>
            <div className={styles.updateDiv}>
                <input
                    onChange={handleUpdate('price')}
                    type="number"
                    className={styles.inputField}
                    value={updateProductValues.price}
                />
            </div>
            <button>Save</button>
            <p className={styles.promParagraph} style={{marginTop:'10px',borderBottom:'1px solid black'}}>Update product</p>
        </form></div>)


    const photoForm = () => (
        <form onSubmit={clickSubmit}>
            <h3 className={styles.adminLinksTitleCert}>Post Certificate</h3>
            <div className={styles.formDiv}>
                <label>
                    <input
                        className={styles.dashboardInput}
                        onChange={handlePhoto}
                        type="file" name='image'
                        accept="image/*"
                    />
                </label>
            </div>
            <div className={styles.formDiv}>
                <div style={{ width: '100%' }}>
                    <p className={styles.promParagraph} style={{ marginTop: '3px' }}>Certificate name</p>
                    <input
                        onChange={handleChange('name')}
                        type="text"
                        className={styles.formInput}
                        style={{ height: '30px' }}
                        value={name}
                    />
                </div>
            </div>
            <div className={styles.formDiv}>
                <button className={styles.submitBtn}>Submit</button>
            </div>
        </form>)

    const promotionForm = () => {
        return (
            <div>
                <form className={styles.textareaForm} onSubmit={submitPromotion}>
                    <p className={styles.promParagraph}>Promotion title</p>
                    <div className={styles.formDiv}>
                        <input
                            onChange={handleChangePromotions('title')}
                            type="text"
                            value={promotionValues.title}
                        />
                    </div>
                    <p className={styles.promParagraph} style={{ marginTop: '3px' }}>Promotion message</p>
                    <div className={styles.formDiv}>
                        <textarea
                            onChange={handleChangePromotions('text')}
                            type="text"
                            value={promotionValues.content}
                        />
                    </div>
                    <div className={styles.formDiv}>
                        <button className={styles.textareaButton}>Submit</button>
                    </div>
                </form>
            </div>
        )
    }

    const deletePromotionComponent = () => (
        <div className={styles.controlsElement}>
            <div className={styles.formDiv}>
                <p className={styles.promParagraph} style={{ marginTop: '20px' }}>Delete promotion</p>
            </div>
            <select className={styles.controlsSelect} onChange={(event) => setPromotionId(event.target.value)}>
                <option >Please select</option >
                {promotions &&
                    promotions.map((promotion, i) => (
                        <option key={i} value={promotion._id}>
                            {promotion.title}
                        </option >
                    ))}
            </select>
            <button disabled={!promotionId ? true : false} className={styles.controlsButton} style={{ marginBottom: '2rem' }} onClick={(e) => { hnadleDeletePromotion(promotionId) }}>Delete</button>
        </div>)

    const deleteCategoryComponent = () => (
        <div className={styles.controlsElement}>
            <label className={styles.promParagraph}>Category delete/update</label>
            <select id={'category select'} className={styles.controlsSelect} onChange={(event) =>{setCategoryId(event.target.value);if(showUpdateCategoryFrom){
                setShowUpdateCategoryForm(false)
            }}}>
                <option value={''}>Please select</option >
                {categories &&
                    categories.map((c, i) => (
                        <option key={i} value={c._id}>
                            {c.name}
                        </option >
                    ))}
            </select>
            <button disabled={!categoryId ? true : false} className={styles.controlsButton} onClick={() => { hnadleDeleteCayegory(categoryId) }}>Delete</button>
            <button disabled={(showUpdateCategoryFrom ? true : false)||(!categoryId? true : false)} className={styles.controlsButton} onClick={() => { fetchCategory(categoryId) }}>Update</button>
        </div>)

    const deleteProductComponent = () => (
        <div className={styles.controlsElement} style={{ marginTop: '20px' }}>
            <label className={styles.promParagraph} >Product delete/update</label>
            <select id={'product select'} className={styles.controlsSelect} onChange={(event) => { setProductId(event.target.value); if(showUpdateFrom){
                setShowUpdateForm(false)
            } }}>
                <option value={''}>Please select</option >
                {products &&
                    products.map((c, i) => (
                        <option key={i} value={c._id}>
                            {c.name}
                        </option >
                    ))}
            </select>
            <button disabled={!productId ? true : false} className={styles.controlsButton} onClick={() => { hnadleDeleteProduct(productId) }}>Delete</button>
            <button disabled={(showUpdateFrom ? true : false)||(!productId? true : false)} className={styles.controlsButton} onClick={() => { fetchProduct(productId) }}>Update</button>
        </div>)

    const promotionsComponent = () => {
        return (
            <div>
                <h3 className={styles.adminLinksTitle} style={{ marginTop: '20px' }}> Create/Delete Promotion</h3>
                {promotionForm()}
                {deletePromotionComponent()}
            </div>
        )

    }

    const adminLinks = () => {

        return (<div>
            <h3 className={styles.adminLinksTitle}> Create Product/Category</h3>
            <div className={styles.adminLinks}>
                <Link className={styles.adminLink} to='/create/category'><p>Create Category</p></Link>
                <Link className={styles.adminLink} to="/create/product"><p>Create Product</p></Link>
            </div>
        </div>)
    }

    const adminControls = () => {
        return (
            <div>
                <h3 className={styles.adminLinksTitle} style={{ marginTop: '20px' }}>Delete Product/Category</h3>
                {catError && showCategoryError()}
                {showUpdateCategoryFrom && updateCategoryFormJSX()}
                {deleteCategoryComponent()}
                {prodError && showProductError()}
                {showUpdateFrom && updateProductFormJSX()}
                {deleteProductComponent()}

            </div>
        )
    }

    return (
        <AUX>
            <Menu />

            {adminLinks()}
            {adminControls()}
            <div>
                {showSuccess()}
                {showError()}
                {photoForm()}
            </div>
            {showPromotionSuccess()}
            {showPromotionError()}
            {promotionsComponent()}
        </AUX>
    )
}

export default AdminDashboard