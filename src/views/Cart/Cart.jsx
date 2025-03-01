import './Cart.css';
import React, {useEffect , useContext, useState} from 'react';
import { Button } from 'react-bootstrap';
import { CartContext } from '../../context/CartContext';
import { UserContext } from '../../context/UserContext.jsx';
import { ItemsContext } from '../../context/ItemsContext.jsx';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cart, total, añadirItemBD, eliminarItemBD, realizarCompra } = useContext(CartContext);
    const { items } = useContext(ItemsContext);
    const { id } = useContext(UserContext);
    const navigate = useNavigate();

    const [showForm, setShowForm] = useState(false);
    const [datosComprador, setDatosComprador] = useState({
        nombre: '',
        email: '',
        telefono: '',
        direccion: ''
    });
    const [validated, setValidated] = useState(false);
    const cartItems = {};
    cart.forEach(item => {
        cartItems[item.idproducto] = item;
    });
    const itemsEnCarrito = items.filter(item => cartItems[item.idproducto]);
    if (itemsEnCarrito.length === 0) {
        return (
            <Container className="py-5 text-center">
                <h2>Tu carrito está vacío</h2>
                <p>Agrega productos para comenzar a comprar</p>
                <Button 
                    variant="primary" 
                    onClick={() => navigate('/')}
                >
                    Ir a la tienda
                </Button>
            </Container>
        );
    }
    return(
        <div className='carrito'>
            <h1>Tu carrito</h1>;
            <div className="cart-items">
                {itemsEnCarrito.map(item => {
                    const cartItem = cartItems[item.idproducto];
                    return (
                        <div key={item.idproducto} className="cart-item">
                            <div className="item-info">
                                <h4>{item.nombre}</h4>
                                <p>{item.precio} x {cartItem.cantidad} = ${(item.precio * cartItem.cantidad).toFixed(2)}</p>
                            </div>
                            <div className="item-actions">
                                <Button 
                                    variant="outline-primary" 
                                    size="sm"
                                    onClick={() => añadirItemBD(item)}
                                >
                                    +
                                </Button>
                                <Button 
                                    variant="outline-danger" 
                                    size="sm"
                                    onClick={() => eliminarItemBD(item)}
                                >
                                    -
                                </Button>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="cart-total">
                <h3>Total: ${total.toFixed(2)}</h3>
            </div>
        </div>
    )
}
export default Cart;