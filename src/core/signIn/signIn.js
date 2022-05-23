import './signIn.css'
import Navigation from '../../layout/Navigation'
import { Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { signin, authenticate, isAuthenticated } from '../apiCore'

const SignIn = ()=>{
    const [values, setValues] = useState({
        email: '',
        password:'',
        error: '',
        loading: false,
        redirectToReferrer: false
    })

    const {email, password, loading, error, redirectToReferrer} = values
    const {user} = isAuthenticated

    const handleChange = name => thisevent => {
        setValues({...values, error: false, [name]: thisevent.target.value})
    }

    const clickSubmit = (event) => {
        event.preventDefault()
        setValues({...values, error: false, loading: true})
        signin({email, password})
            .then(data =>{
                if(data.error){
                    setValues({...values, error: data.error, loading: false})
                } else {
                    authenticate(
                        data, () =>{
                            setValues({
                                ...values,
                                redirectToReferrer: true
                            })
                        }
                    )
                }
            })
    }

    const signInForm = () => (
        <form className="sign-box">
            <div className="form-group">
                <label className="text-muted" >Email</label>
                <input 
                    onChange={handleChange('email')}
                    type="email"
                    className='form-control'
                    value={email}
                    required
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
                // onClick={clickSubmit}
                className="s-btn btn btn-primary login-btn"
                onClick={clickSubmit}    
            >
                Login
            </button>
        </form>
    )

    const redirectUser = () => {
        if(redirectToReferrer){
            if(user && user.role === 1){
                return <Navigate to="/admin/dashboard" />
            } else {
            return <Navigate to="/" />
            }
        }
        if(isAuthenticated()){
            return <Navigate to='/' /> 
        }
    }
    return(
        <>
            <Navigation />
            <div className="mt-5">
                <h4 className='text-center'>Login</h4>
                {signInForm()}
                {redirectUser()}
            </div>
        </>
    )

}

export default SignIn