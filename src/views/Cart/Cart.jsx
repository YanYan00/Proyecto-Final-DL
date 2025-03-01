import './Cart.css';
import React, { useContext, useState } from 'react';
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
    
    const [currentView, setCurrentView] = useState('cart');
    const [datosComprador, setDatosComprador] = useState({
        nombre: '',
        email: '',
        telefono: '',
        direccion: ''
    });
    const [validated, setValidated] = useState(false);
    const [orderResult, setOrderResult] = useState(null);

    const cartItems = {};
    cart.forEach(item => {
        cartItems[item.idproducto] = item;
    });

    const itemsEnCarrito = items.filter(item => cartItems[item.idproducto]);

    const handleComprar = async () => {
        try {
            if (id || currentView === 'form') {
                const resultado = await realizarCompra(currentView === 'form' ? datosComprador : null);
                
                if (resultado && resultado.requiresForm) {
                    setCurrentView('form');
                    return;
                }
                setOrderResult(resultado);
                setCurrentView('confirmation');
            } else {
                setCurrentView('form');
            }
        } catch (error) {
            console.error("Error al realizar la compra:", error);
            alert("Hubo un error al procesar tu compra. Por favor, intenta de nuevo.");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDatosComprador({
            ...datosComprador,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
            return;
        }   
        handleComprar();
    };
    const handleBackToCart = () => {
        setCurrentView('cart');
    };
    if (itemsEnCarrito.length === 0) {
        return (
            <div className="cart-empty">
                <h2>Tu carrito está vacío</h2>
                <p>Agrega productos para comenzar a comprar</p>
                <button 
                    variant="primary" 
                    onClick={() => navigate('/')}
                >
                    Ir a la tienda
                </button>
            </div>
        );
    }
    if (currentView === 'confirmation') {
        return (
            <div className="confirmation-view">
                <h2>¡Compra realizada con éxito!</h2>
                <p>Tu número de orden es: {orderResult?.numeroOrden || 'Pendiente'}</p>
                <p>Recibirás un correo con los detalles de tu compra.</p>
                <button 
                    variant="primary" 
                    onClick={() => navigate('/')}
                >
                    Volver a la tienda
                </button>
            </div>
        );
    }
    if (currentView === 'form') {
        return (
            <div className="form-view">
                <h2>Información de Compra</h2>
                <p>Total a pagar: ${total.toFixed(2)}</p>
                
                <form 
                    className={`buyer-form ${validated ? 'was-validated' : ''}`}
                    noValidate
                    onSubmit={handleSubmit}
                >
                    <h4>Información de Contacto</h4>
                    <div className="form-group">
                        <label>Nombre</label>
                        <input type="text" name="nombre" value={datosComprador.nombre} onChange={handleInputChange} required className="form-control"/>
                        <div className="invalid-feedback">
                            Por favor ingresa tu nombre
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={datosComprador.email}
                            onChange={handleInputChange}
                            required
                            className="form-control"
                        />
                        <div className="invalid-feedback">
                            Por favor ingresa un email válido
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Teléfono</label>
                        <input
                            type="tel"
                            name="telefono"
                            value={datosComprador.telefono}
                            onChange={handleInputChange}
                            required
                            className="form-control"
                        />
                        <div className="invalid-feedback">
                            Por favor ingresa un teléfono
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Dirección</label>
                        <input
                            type="text"
                            name="direccion"
                            value={datosComprador.direccion}
                            onChange={handleInputChange}
                            required
                            className="form-control"
                        />
                        <div className="invalid-feedback">
                            Por favor ingresa una dirección
                        </div>
                    </div>
                    
                    <div className="form-actions">
                        <button
                            type="submit" 
                            variant="success"
                        >
                            Finalizar Compra
                        </button>
                        <button 
                            variant="secondary"
                            onClick={handleBackToCart}
                        >
                            Volver al Carrito
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="cart-container">
            <h2>Tu Carrito</h2>
            
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
                                <button 
                                    variant="outline-primary" 
                                    size="sm"
                                    onClick={() => añadirItemBD(item)}
                                >
                                    +
                                </button>
                                <button 
                                    variant="outline-danger" 
                                    size="sm"
                                    onClick={() => eliminarItemBD(item)}
                                >
                                    -
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            <div className="cart-total">
                <h3>Total: ${total.toFixed(2)}</h3>
            </div>
            
            <div className="cart-actions">
                <button
                    variant="success" 
                    onClick={handleComprar}
                >
                    Comprar ahora
                </button>
                <button
                    variant="secondary"
                    onClick={() => navigate('/')}
                >
                    Seguir comprando
                </button>
            </div>
        </div>
    );
};

export default Cart;