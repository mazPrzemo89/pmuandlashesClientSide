import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import styles from './Signin.module.css'
import { signin, authenticate, isAuthenticated } from '../../auth'
import Menu from '../Menu/Menu'

const Signin = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        redirectToReferrer: false
    })

    const { email, password, loading, error, redirectToReferrer } = values
    const { user } = isAuthenticated()

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    const clickSubmit = (event) => {
        event.preventDefault()
        setValues({ ...values, error: false, loading: true })
        signin({ email, password })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, loading: false })
                } else {
                    authenticate(
                        data,
                        () => {
                            setValues({
                                redirectToReferrer: true
                            })
                        }
                    )
                }
            })
    }

    const signInForm = () => (
        <form>
            <label>Email</label>
            <div className={styles.formDiv}>

                <input
                    onChange={handleChange('email')}
                    type="email"
                    className={styles.formField}
                    value={email}
                />
            </div>
            <label>Password</label>
            <div className={styles.formDiv}>

                <input
                    onChange={handleChange('password')}
                    type="password"
                    className={styles.formField}
                    value={password}
                />
            </div>
            <button className={styles.signinButton} onClick={clickSubmit}>Signin</button>
        </form>
    )

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    )

    const showLoading = () =>
        loading && (
            <div className="alert alert-info">
                <h2>Loading</h2>
            </div>
        );

    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />
            }
        }

    }


    return (
        <div>
            <Menu />
            <div className={styles.signin}>
                {showLoading()}
                {showError()}
                {signInForm()}
                {redirectUser()}
            </div>
        </div>
    )
}

export default Signin