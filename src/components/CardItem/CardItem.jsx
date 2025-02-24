import React from 'react'
import './CardItem.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {useNavigate} from 'react-router-dom';

const CardItem = ({item, añadirItem}) => {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                {item.urlimagen && (
                    <img 
                        src={item.urlimagen} 
                        alt={item.nombre}
                        className="w-full h-48 object-cover rounded-t"
                    />
                )}
                <Card.Title>{item.nombre}</Card.Title>
                <Card.Text>Valor: ${item.precio}</Card.Text>
                <Button variant="primary" onClick={() => añadirItem(item)}>+</Button>
                <Button variant="primary">guardar</Button>
            </Card.Body>
        </Card>
    );
};
export default CardItem