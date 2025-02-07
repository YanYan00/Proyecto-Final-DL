import './Cart.css';
import React, {useEffect , useContext} from 'react';
import {CartContext} from '../../context/CartContext.jsx'
import { Button } from 'react-bootstrap';

const Cart = () => {
    const {cart, total, añadirItem, eliminarItem} = useContext(CartContext);
    return(
        <>
            <div className='cart'>
                <h3>Total: ${total.toLocaleString()}</h3>
                {cart.map((item,index) => (
                    <div key={index} className='item'>
                        <div className='contenidoPizza'>
                            <h4>{item.nombre}, ${item.precio.toLocaleString()} x {item.cantidad} </h4>
                            <div className='botonesAgregado'>
                                <Button onClick={()=> añadirItem(item)}>+</Button>
                                <Button onClick={()=> eliminarItem(item)}>-</Button>
                            </div> 
                        </div>
                    </div>

                ))}
                <Button className='botonPago'>Pagar</Button>
            </div>
        </>
    )
}
export default Cart;