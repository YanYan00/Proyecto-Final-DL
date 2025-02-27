import React from 'react'
import './CardItem.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {useNavigate} from 'react-router-dom';

const CardItem = ({item, añadirItem}) => {
    const navigate = useNavigate();
    const verDetalle = () =>{
        navigate(`/producto/${item.idproducto}`);
    }

    return (
        <Card style={{ width: '18rem' }} onClick={verDetalle}>
            <div className='card-img-cont'>
                {item.urlimagen && (
                    <Card.Img 
                        variant="top" 
                        src={item.urlimagen} 
                        alt={item.nombre}
                        style={{ objectFit: 'cover', height: '100%', width: '100%' }}
                        onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/150?text=Sin+imagen';
                        }}
                    />
                )}
            </div>   
            <Card.Body>    
                <Card.Title>{item.nombre}</Card.Title>
                <Card.Text>{item.precio?.toLocaleString()}</Card.Text>
            </Card.Body>
        </Card>
    );
};
export default CardItem