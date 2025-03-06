import React, { useContext, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Navbar.css'
import { UserContext } from '../../context/UserContext';

const Navbar = () => {
    const { token, logout, perfil } = useContext(UserContext);
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className='navbar'>
            <Link to="/">
                <h3 className='home'>¡Bienvenido {token && perfil?.nombre ? perfil.nombre : ''}!</h3>
            </Link>
            <div className='menu-toggle' onClick={toggleMenu}>
                <div className='hamburger'></div>
            </div>
            <div className={`btns ${menuOpen ? 'active' : ''}`}>
                {token ? (
                    <>
                        <Link to="/cart" className="me-3">
                            <Button className='btn-view'>🛒</Button>
                        </Link>
                        <Link to="/purchases" className="me-3">
                            <Button className='btn-view'>Mis compras</Button>
                        </Link>
                        <Link to="/orders" className="me-3">
                            <Button className='btn-view'>Mis pedidos</Button>
                        </Link>
                        <Link to="/posts" className="me-3">
                            <Button className='btn-view'>Mis publicaciones</Button>
                        </Link>
                        <Link to="/profile" className="me-3">
                            <Button className='btn-view'>Mi Perfil</Button>
                        </Link>
                        <Button className='btn-view' onClick={logout}>Cerrar Sesión</Button>
                    </>
                ) : (
                    <>
                        <Link to="/cart" className="me-3">
                            <Button className='btn-view'>🛒</Button>
                        </Link>
                        <Link to="/login" className="me-3">
                            <Button className='btn-view'>Iniciar Sesión</Button>
                        </Link>
                        <Link to="/register">
                            <Button className='btn-view'>Registrarse</Button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;