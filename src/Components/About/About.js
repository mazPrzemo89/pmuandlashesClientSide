import React, { useState, useEffect }  from 'react'
import AUX from '../Utils/aux/Aux'
import Menu from "../Menu/Menu";
import styles from './About.module.css'
import { setAdminInfoApi, getAdminInfo } from '../../APIs/adminApi'
import { isAuthenticated } from '../../auth'
import imageFb from './facebook.png'
import imageInsta from './instagram.png'


const About = () => {
    const { user, token } = isAuthenticated()
    const [adminInfo, setAdminInfo] = useState({
        title:'',
        message:'',
        photo:''
    })
 
    const [formData ,setFromData] = useState(new FormData())

    const handleFormChange = name => event => {
        const value = event.target.value;
        formData.set(name, value)
    }


    const handleFormPhoto =  event => {
        formData.set( 'photo', event.target.files[0])
    }

    const getInfo =()=> {
        getAdminInfo().then((data, err)=>{
            if(err){
                console.log(err)
            }
            if(data===null){
                console.log('Post Admin Info')
            } else {
                setAdminInfo({title:data.title,message:data.message,photo:data.photo})
            }
          
        })
    }
    useEffect(()=> {
        getInfo()
    },[])


    const adminMessageForm = () => {
        return (
            <AUX>
                <form onSubmit={(e)=>{e.preventDefault(); setAdminInfoApi(user._id, token, formData)}}>
                    <div>
                        <label>Title:</label>
                        <input 
                            className={styles.inputField}
                            onChange={handleFormChange('title')} 
                            type="text" 
                            value={formData.title}
                        />
                    </div>
                    <div>
                        <label>Message:</label>
                        <textarea
                        onChange={handleFormChange('message')}
                        type="text"  
                        value={formData.message}
                        />
                    </div>
                    <div>
                        <label>Photo:</label>
                        <input
                        onChange={handleFormPhoto} 
                        type="file" name='photo'
                        accept="image/*"
                        />
                    </div>
                    <button>Submit</button>
                </form>
            </AUX>
        )
    }

    const image = () => {
        return (
            <div className={styles.dagaDiv}>
                <img alt='admin' className={styles.photoDaga} src={adminInfo.photo}/>
            </div>
        )
    }

    const adminTitleJSX = () => {
        return (
            <p className={styles.title}>{adminInfo.title}</p>
        )
    }

    const adminMessageJSX = () => {
        return (
            <p className={styles.textarea}>{adminInfo.message}</p>
        )
    }

    const socialMediaLinks = () => {
        return(
        <div className={styles.imageDiv}>
            <a  className={styles.link} href={'https://www.facebook.com/DaGabrowsandlashes'} target={'_blank'} rel="noopener noreferrer">
                <img alt='facebook' className={styles.photo} src={imageFb}/>
            </a>
            <div className={styles.photo}></div>
            <a className={styles.link} href={'https://www.instagram.com/permanent_make_up_and_lash'} target={'_blank'} rel="noopener noreferrer"> 
                <img alt='instagram' className={styles.photo} src={imageInsta}/>
            </a>
        </div>
        )
    }

    return(
    <AUX>
       <Menu/>
        {adminInfo && adminTitleJSX()}
        {adminInfo && adminMessageJSX()}
        {socialMediaLinks()}
        {adminInfo && image()}
        {user && user.role === 1 && adminMessageForm()}
    </AUX> 
    )}

export default About