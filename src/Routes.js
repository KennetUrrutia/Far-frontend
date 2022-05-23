import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './core/Home/Home'
import Search from './core/Search/Search'
import SignIn from './core/signIn/signIn'
import SignUp from './core/signUp/signUp'
import AddCategory from './core/Category/addCategory'
import AddProduct from './core/Product/addProduct'
import Medicamento from '../src/core/Medicamento/Medicamento'

const RoutesFunction = () =>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' exact element={<Home />} />
                <Route path='/medicamentos/:medicamentosId' exact element={<Medicamento/>} />
                <Route path='/medicamentoById' exact element={<Search/>} />
                <Route path='/signin' exact element={<SignIn />} />
                <Route path='/signup' exact element={<SignUp />} />
                <Route path='/addcategory' exact element={<AddCategory/>} />
                <Route path='/addproduct' exact element={<AddProduct/>} />
            </Routes>
        </BrowserRouter>
        
    )
}

export default RoutesFunction