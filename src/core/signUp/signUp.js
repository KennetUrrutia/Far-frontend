import Navigation from '../../layout/Navigation'
import { useEffect, useState } from 'react'
import { signUp } from '../../core/apiCore'
import { Tooltip } from 'reactstrap'
import { Link, Navigate } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import './signUp.css'

const SignUp = ()=>{

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    })

    const { name, email, password,  success, error } = values
    
    const handleChange = name => thisEvent => {
        setValues({...values, error: false, [name]: thisEvent.target.value})
    }

    const clickSubmit = (event) => {
        event.preventDefault()
        setValues({...values, error: false})
        signUp({ name, email, password})
            .then(data =>{
                if(data.error) {
                    setValues({...values, error: data.error, success: false})
                    showError()
                } else {
                    showSuccess()
                    setValues({
                        ...values, 
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
        <form className="sign-box">
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input 
                    onChange={handleChange('name')}
                    type="text"
                    className='form-control'
                    value={name} 
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input 
                    onChange={handleChange('email')}
                    type="email"
                    className='form-control'
                    value={email}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input 
                    onChange={handleChange('password')}
                    type="password"
                    className='form-control'
                    value={password} 
                />
            </div>
            <button 
                onClick={clickSubmit}
                className="btn btn-primary" >
                Register
            </button>
        </form>
    )

    const showSuccess = () =>{
        if (success) {
            return <h3 className="text-success">User is uccesfully created</h3>
        }
    }

    const showError = () =>{
        if (error) {
            return <div className="test-danger">"error, that user alredy exist"</div>
        }
    }
    return(
        <>
            <Navigation />
            <div className='mt-5'>
                <h4 className='text-center'>Signup form</h4>
                {showError()}
                {showSuccess()}
                {signUpForm()}
            </div>
        </>
    )

}

export default SignUp