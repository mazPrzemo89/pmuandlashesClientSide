import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import AUX from '../Utils/aux/Aux'
import Hamburger from '../Utils/DrawerToggle/DrawerToggle'
import SideDrawer from '../Utils/SideDrawer/SideDrawer'
import { signout, isAuthenticated } from '../../auth'
import stylesMenu from '../../styles/shared.module.css'
import styles from './Menu.module.css'


const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: 'black' }
    } else {
        return { color: 'black' }
    }
}

const Menu = ({ history }) => {

    const [isAdmin, setIsAdmin] = useState(false)
    const [show, setShow] = useState(false)


    const toggleShow = () => {
        if (isAuthenticated()) {
            if (isAuthenticated().user.role === 1) {
                setIsAdmin(true)
            }
        }
        setShow(!show)
    }



    return (
        <AUX>
            <div className={stylesMenu.nav_bar_main}>
                <button className={stylesMenu.menu_button} onClick={() => { toggleShow() }} to="/"><Hamburger /></button>
                <Link className={stylesMenu.logo_menu} style={isActive(history, '/')} to="/"></Link>
                <Link className={stylesMenu.home_button} style={isActive(history, '/')} to="/"></Link>
            </div>
            <SideDrawer open={show} closed={toggleShow}>
                <div className={stylesMenu.logo_side}></div>
                <ul className={stylesMenu.link}>

                    <div className={isAdmin ? stylesMenu.menuAdmin : undefined}>
                        <Link style={isActive(history, '/home')} to="/home">
                            <p className={stylesMenu.para}>Home</p>
                        </Link>
                        <div className={!isAdmin ? stylesMenu.bottom : ''}></div>
                    </div>

                    <div className={isAdmin ? stylesMenu.menuAdmin : undefined}>
                        <Link style={isActive(history, '/promotions')} to="/promotions">
                            <p className={stylesMenu.para}>Promotions</p>
                        </Link>
                        <div className={!isAdmin ? stylesMenu.bottom : ''}></div>
                    </div>

                    {isAuthenticated() && isAuthenticated().user.role === 1 && (
                        <div className={isAdmin ? stylesMenu.menuAdmin : undefined}>
                            <Link style={isActive(history, '/admin/dashboard')} to="/admin/dashboard">
                                <p className={stylesMenu.para}>Dashboard</p>
                            </Link>
                            <div className={!isAdmin ? stylesMenu.bottom : ''}></div>
                        </div>
                    )}
                    {isAuthenticated() && isAuthenticated().user.role === 1 && (
                        <div className={isAdmin ? stylesMenu.menuAdmin : undefined}>
                            <Link style={isActive(history, '/times')} to="/times">
                                <p className={stylesMenu.para}>Time sheet</p>
                            </Link>
                            <div className={!isAdmin ? stylesMenu.bottom : ''}></div>
                        </div>
                    )}
                    {isAuthenticated() && isAuthenticated().user.role === 1 && (
                        <div className={isAdmin ? stylesMenu.menuAdmin : undefined}>
                            <Link style={isActive(history, '/calendar')} to="/calendar">
                                <p className={stylesMenu.para}>Calendar</p>
                            </Link>
                            <div className={!isAdmin ? stylesMenu.bottom : ''}></div>
                        </div>
                    )}
                    {isAuthenticated() && isAuthenticated().user.role === 1 && (
                        <div className={isAdmin ? stylesMenu.menuAdmin : undefined}>
                            <Link style={isActive(history, '/admin/bookings')} to="/admin/bookings">
                                <p className={stylesMenu.para}>Bookings</p>
                            </Link>
                            <div className={!isAdmin ? stylesMenu.bottom : ''}></div>
                        </div>
                    )}

                    <div className={isAdmin ? stylesMenu.menuAdmin : undefined}>
                        <Link style={isActive(history, '/about')} to="/about">
                            <p className={stylesMenu.para}>About</p>
                        </Link>
                        <div className={!isAdmin ? stylesMenu.bottom : ''}></div>
                    </div>


                    <div className={isAdmin ? stylesMenu.menuAdmin : undefined}>
                        <Link style={isActive(history, '/testimonial')} to="/testimonial">
                            <p className={stylesMenu.para}>Qualifications</p>
                        </Link>
                        <div className={!isAdmin ? stylesMenu.bottom : ''}></div>
                    </div>
                    {!isAuthenticated() && <div className={isAdmin ? stylesMenu.menuAdmin : undefined}>
                        <Link style={isActive(history, '/signup')} to="/signup">
                            <p className={stylesMenu.para}>Signup</p>
                        </Link>
                        <div className={!isAdmin ? stylesMenu.bottom : ''}></div>
                    </div>}

                    {isAuthenticated() && (
                        <div className={isAdmin ? stylesMenu.menuAdmin : undefined}>
                            <span style={{ cursor: 'pointer', color: 'black' }} onClick={() => signout(() => { history.push('/') })}>
                                <p className={stylesMenu.para}>Signout</p>
                            </span>
                            <div className={!isAdmin ? stylesMenu.bottom : ''}></div>
                        </div>
                    )}
                </ul>
            </SideDrawer>

        </AUX>
    )
}

export default withRouter(Menu)