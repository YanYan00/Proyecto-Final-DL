import React from 'react'
import './CardItem.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {useNavigate} from 'react-router-dom';

const CardItem = ({item,añadirItem}) => {
    return (
        <>
  
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Primera Card</Card.Title>
                    <Card.Text>
                        Esta es la card de prueba
                    </Card.Text>
                    <Button variant="primary">+</Button>
                    <Button variant="primary">guardar</Button>
                </Card.Body>
            </Card>

        </>
    )
}
export default CardItem