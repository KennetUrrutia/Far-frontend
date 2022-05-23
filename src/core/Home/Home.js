import { useEffect, useState } from 'react'
import Navigation from '../../layout/Navigation'
import { getMedicamentos } from '../apiCore'
import Card from '../Card/Card'
import './Home.css'


const Home = (req,res) => {
    //State
    const  [medicamentos, setMedicamentos] = useState([])
    const [error, setError] = useState(false)

    //api
    const loadMedicamentos = () =>{
        getMedicamentos().then(data =>{
            if (data.err){
                setError(data.err)
            }else{
                setMedicamentos(data)
            }
        })
    }

    //Al inicio va a ejecutar esta funcion
    useEffect(() =>{
        loadMedicamentos()
    }, [])
    return(
        <>
            <Navigation/>
            <div className="container">
                <div className="row">
                    {medicamentos.map((medicamento, i) => (
                        <div key={i} className="col-lg-4 col-md-6 col-sm-6 col-sm-6">
                            <Card med={medicamento} />
                        </div>
                ))}
                </div>
            </div>
        </>      
    )
}

export default Home