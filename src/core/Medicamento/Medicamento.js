import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Navigation from '../../layout/Navigation'
import { read } from '../apiCore'
import Card from '../Card/Card'

const Medicamentos = ( props ) =>{
    const [medicamento, setMedicamento] = useState({})
    const [error, setError] = useState(false)
    const medicamentoId2 = useParams()

    const loadSingleMedicamento = medicamentoId => {
        read(Object.values(medicamentoId))
        .then(data => {
            if (data.error){
                setError(data.error)
            }else{
                setMedicamento(data)
            }
        })
    } 

    useEffect(() =>{
        loadSingleMedicamento(medicamentoId2)
    }, [medicamentoId2])

    return (
        <>
            <Navigation />
            <div className="container">
                <h2>
                    This is the medicamentos page
                </h2>
                {
                    medicamento &&
                    <Card med={medicamento}/>
                }
            </div>
        </>
    )
}

export default Medicamentos