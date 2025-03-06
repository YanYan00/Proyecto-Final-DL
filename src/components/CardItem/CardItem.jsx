import React from 'react'
import './CardItem.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import {useNavigate} from 'react-router-dom';

const CardItem = ({item, añadirItem}) => {
    const navigate = useNavigate();
    const verDetalle = () =>{
        navigate(`/producto/${item.idproducto}`);
    }

    return (
        <Card className='card' onClick={verDetalle}>
            <div className='card-img-cont'>
                {item.urlimagen && (
                    <Card.Img 
                        variant="top" 
                        src={item.urlimagen} 
                        alt={item.nombre}
                        style={{ objectFit: 'cover' }}
                        className='card-img'
                    />
                )}
            </div>   
            <Card.Body>    
                <Card.Title className='card-name'>{item.nombre}</Card.Title>
                <Card.Text className='card-price'><span>${item.precio?.toLocaleString()}</span></Card.Text>
            </Card.Body>
        </Card>
    );
};
export default CardItem