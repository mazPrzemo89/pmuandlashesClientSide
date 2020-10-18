import React, { useEffect,}  from 'react'
import { useLocation } from 'react-router-dom'
import AUX from '../Utils/aux/Aux'
import Menu from "../Menu/Menu"
import Footer from '../Footer/Footer'



const Layout = ({title = 'Title', description='Description', className ,children}) => {
    let location = useLocation()
    useEffect(()=>{
        if(location.pathname === '/Products'){
            document.getElementById('footer').style.position = ''
        }
    },[])   
    return(
    <AUX>
       <Menu/>
        <div className={className} >{children}</div>
        <Footer/>
    </AUX> 
    )}

export default Layout