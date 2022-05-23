import Navigation from '../../layout/Navigation'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated, createCategory } from '../apiCore'

const Addcategory = () =>{
    const [name, setName] = useState('')
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const {user, token} = isAuthenticated()

    const handleChange = (event) =>{
        setError('')
        setName(event.target.value)
    }

    const clickSubmit = (event) => {
        event.preventDefault();
        setError('');
        setSuccess(false);
        // make api call to end-point
        createCategory(user._id, token, {name})
        .then(data => {
          if(data.error) {
            setError(true)
          } else {
            setError('');
            setSuccess(true);
          }
        })
    }

    const showSuccess = () =>{
        if (success) {
            return <h3 className="text-success">The category "{name}" was succesfully created</h3>
        }
    }

    const showError = () =>{
        if (error) {
            return <div className="test-danger">"{name} should be unique, try another one"</div>
        }
    }

    const newCategoryForm = () => (
        <div>
            <h2>Add New Category</h2>
            <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" className="form-control"
                onChange={handleChange} value={name} required autoFocus/>
            </div>
            <button className="btn btn-outline-success mt-2">
                Create Category
            </button>
            </form>
        </div>
    )

    const goBack = () => (
        <div className='mt-5'>
            <Link to='/' className='text-warning'>
                Back to Dashboard
            </Link>
        </div>
    )

    return (
        <>
            <Navigation />
            <div className='mt-5 container'>
                {showSuccess()}
                {showError()}
                {newCategoryForm()}
                {goBack()}
            </div>
        </>
    )
}

export default Addcategory