import Navigation from '../../layout/Navigation'
import { useEffect, useState } from 'react'
import { isAuthenticated, getCategories, createMedicamentos } from '../apiCore'


const AddProducts = () =>{
  const [selectCategory, setSelectCategory] = useState([])
  const [values, setValues] = useState({
      name: '',
      description: '',
      price: '',
      categories: [],
      category: '',
      quantity: '',
      photo: '',
      loading: false,
      error: '',
      createdMedicamentos: '',
      redirectToProfile: false,
      formData: ''
    })  
    
    const { user, token } = isAuthenticated()
    const {
      name,
      description,
      price,
      categories,
      category,
      quantity,
      photo,
      loading,
      error,
      createdMedicamentos,
      redirectToProfile,
      formData
    } = values;

    const init = () => {
      getCategories().then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error })
        } else {
          setSelectCategory(data.data)
          setValues({ ...values, formData: new FormData() })
        }
      })
    }

    useEffect(() => {
      setValues({...values, formData: new FormData()});
      init();
    }, []);

  const handleChange = name => event => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value
    formData.set([name], value)
    setValues({ ...values, [name]: value })
  }
  const showError = () => (
    <div
      className='alert alert-danger'
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  )

  const showSuccess = () => (
    <div
      className='alert alert-info'
      style={{ display: createdMedicamentos ? '' : 'none' }}
    >
      <h2>{`${createdMedicamentos} was succesfully created`}</h2>
    </div>
  )

  const showLoading = () =>
    loading && (
      <div className='alert alert-success'>
        <h2>Loading ...</h2>
      </div>
    )

    // }
    const clickSubmit = event => {
        event.preventDefault()
        setValues({ ...values, error: '', loading: true })
        // console.log(formData)
        createMedicamentos(user._id, token, formData)
        .then(data => {
          console.log(data)
          if (data.error) {
            setValues({ ...values, error: data.error })
          } else {
            setValues({
              ...values,
              name: '',
              description: '',
              photo: '',
              price: '',
              quantity: '',
              loading: false,
              createdVideogame: data.name
            })
          }
        })
      }

      const newMedicamentoForm = () => (
        <form className='mb-3' onSubmit={clickSubmit}>
          <h4>Post Photo</h4>
          <div className='form-group'>
            <label className='btn btn-secondary'>
              <input
                onChange={handleChange('photo')}
                type='file'
                name='photo'
                accept='image/*'
              />
            </label>
          </div>
          <div className='form-group'>
            <label className='text-muted'>Name</label>
            <input
              onChange={handleChange('name')}
              type='text'
              className='form-control'
              value={name}
            />
          </div>
          <div className='form-group'>
            <label className='text-muted'>Description</label>
            <input
              onChange={handleChange('description')}
              type='text'
              className='form-control'
              value={description}
            />
          </div>
          <div className='form-group'>
            <label className='text-muted'>Price</label>
            <input
              onChange={handleChange('price')}
              type='text'
              className='form-control'
              value={price}
            />
          </div>
          <div className='form-group'>
            <label className='text-muted'>Category</label>
            <select
              onChange={handleChange('category')}
              type='text'
              className='form-control'
            >
              <option>Select Category</option>
              {selectCategory.map((item, index) => (
                  <option key={index} value={item._id}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
          <div className='form-group'>
            <label className='text-muted'>Quantity</label>
            <input
              onChange={handleChange('quantity')}
              type='number'
              className='form-control'
              value={quantity}
            />
          </div>
          <button className='btn btn-outline-primary'>Create Product</button>
        </form>
      )
    return (
        <>
            <Navigation />
            <div className='container mt-5'>
                <div className='row'>
                    <div className='col-md-8 offset-md-2'>
                        {showSuccess()}
                        {showError()}
                        {showLoading()}
                        {newMedicamentoForm()}
                    </div>
                </div>
            </div>     
        </>
    )

}

export default AddProducts