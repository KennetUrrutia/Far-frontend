import { useState } from 'react'
import { Link } from 'react-router-dom';
import './Card.css'
import ShowImage from '../ShowImage/ShowImage'


const Card = ({ med }) => {
    const [count, setCount] = useState(med.count)

    return (
        <div className="card m-10 card-cont">
            <div className=''>
                <ShowImage className="img" item={med} url="medicamentos" />
                <h2>{med.name}</h2>
                <p>Q{med.price}</p>
                <p>{med.description}</p>
                <Link to={`/medicamentos/${med._id}`}>
                    <button className="btn btn-success">Ver Mas</button>
                </Link>
            </div>
        </div>
    )
}

export default Card


