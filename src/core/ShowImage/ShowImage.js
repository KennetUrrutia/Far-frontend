import './ShowImage.css'
import { API } from '../../config'
// const API = "http://localhost:3254/api"

const ShowImage = ({ item, url }) => {

    return (
        <div className="product-img">
            <img 
                src={`${API}/${url}/photo/${item._id}`}
                alt={item.name}
                className="mb-3 img-cont"
                style={{maxHeight: '600px', maxWidth: '300px'}}
            />
        </div>
    )

}

export default ShowImage