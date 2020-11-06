import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Menu from '../Menu/Menu'
import styles from '../Signin/Signin.module.css'
import { signup } from '../../auth'

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    })

    const { name, email, password, success, error } = values

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    const clickSubmit = (event) => {
        event.preventDefault()
        setValues({ ...values, error: false })
        signup({ name, email, password })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false })
                } else {
                    setValues({
                        name: '',
                        email: '',
                        password: '',
                        error: '',
                        success: true
                    })
                }
            })
    }

    const signUpForm = () => (
        <form className={styles.form}>
            <div className={styles.formDiv}>
                <label className={styles.formField}>Name:</label>
                <input

                    onChange={handleChange('name')}
                    type="text"
                    value={name}
                />
            </div>

            <div className={styles.formDiv}>
                <label className={styles.formField}>Email:</label>
                <input

                    onChange={handleChange('email')}
                    type="email"
                    value={email}
                />
            </div>

            <div className={styles.formDiv}>
                <label className={styles.formField}>Password:</label>
                <input

                    onChange={handleChange('password')}
                    type="password"
                    value={password}
                />
            </div>
            <button onClick={clickSubmit}>Signup</button>
        </form>
    )

    const showError = () => (
        <div style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    )

    const showSuccess = () => (
        <div style={{ display: success ? '' : 'none' }}>
            New account is created. Please <Link to="/signin">Signin</Link>
        </div>
    )

    return (
        <div>
            <Menu />
            <div className={styles.signin}>
                {showSuccess()}
                {showError()}
                {signUpForm()}
            </div>
        </div>
    )
}

export default Signup