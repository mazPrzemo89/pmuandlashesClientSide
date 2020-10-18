import React, { useState, useEffect} from 'react'
import { getPhotos, deletePhoto } from '../../APIs/photoApi'
import Menu from '../Menu/Menu'
import AUX from '../Utils/aux/Aux'
import {isAuthenticated} from '../../auth'
import stylesTest from './testimonial.module.css'




const Testimonial = () => { 

    const  { user } = isAuthenticated()
    const [imgs, setImgs] = useState([])
    const [zoomPhotoId, setZoomPhotoId] = useState('')
    const [containerClass, setImageCont] = useState(stylesTest.gridCards)
    const [role, setRole] = useState(0)
    



    useEffect(()=>{
        getPhotos().then(data=>setImgs(data))
        if(user){
            setRole(1)
        }
    },[])

   
    const removePhoto = (id) => {
        deletePhoto(id).then((data, error)=>{
            if(error){
                console.log(error)
            }
            alert('Photo deleted')
        })
    }

    const zoomPhoto = () => {
        
        return (
            <div className={stylesTest.imgZoomContainer}>
            <img alt='cert zoomed' className={stylesTest.imageZoomed} src={zoomPhotoId.image} onClick={()=>{
                setZoomPhotoId('')
                setImageCont(stylesTest.gridCards)
                window.scrollTo(0, 0)
            }}/>
            </div>
        )
    }

    return (
        <AUX>
            <Menu/>
                {zoomPhotoId && zoomPhoto(zoomPhotoId)}
            <div className={containerClass}>
                {imgs && imgs.map((img, i)=>{
                    return (
                        <div key={`${img}${i}`} className={stylesTest.photo}>
                            <img alt='cert' id={i} className={stylesTest.image}  onClick={()=>{
                                setZoomPhotoId(img)
                                setImageCont(stylesTest.photoHidden)
                                window.scrollTo(0, 0)
                            }} src={img.image}/>
                            <button style={{display:role === 1 ? '' : 'none'}} disabled={role === 1 ? false :true} onClick={()=>{removePhoto(img)}}>delete</button>
                        </div>
                    )
                })}
            </div>
        </AUX>
    )

 }

export default Testimonial