import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './footer.module.css'
import phone from './phone.png'
import mail from './mail.png'
import location from './location.png'

const Footer = () => {

    const history = useHistory() 

    function showPopup(url) {
        window.open(url,'name','height=190,width=520,top=200,left=300,resizable');
     
    }

    let heigth = document.getElementById('root').offsetHeight
    
    useEffect(()=>{
        if(history.location.pathname === '/promotions'){
            document.getElementById('footer').style.bottom = '0'
        } 
    },[])

   
   
    
    return(
        <div id={'footer'} className={styles.footer} style={{position: window.innerHeight === heigth ? "absolute" : ''}}>
            <div className={styles.contactDiv}>
                <div className={styles.contact}>
                    <img src={phone} className={styles.icon}/>
                    <p className={styles.contactP}>  +44 7428118398</p>
                </div>
                <div className={styles.contact}>
                <img src={mail} className={styles.icon}/>
                    <p className={styles.contactP}> dagramuda@gmail.com</p>
                </div>
                <div className={styles.contact}>
                <img src={location} className={styles.icon}/>
                    <p className={styles.contactP}> Gomshall Gardens, CR8 5AH </p>
                </div>
            </div>
            <div className={styles.shareButtons}>
                <a onClick={()=>{showPopup('https://www.facebook.com/sharer/sharer.php?u=https://pmuandlashes.studio')}} className={styles.shareFB}>
                 </a>
                <a href='https://www.instagram.com/pmu_and_lash_studio/' target='_blank' className={styles.shareInsta}></a>
                </div>
        </div>
    )}


export default Footer