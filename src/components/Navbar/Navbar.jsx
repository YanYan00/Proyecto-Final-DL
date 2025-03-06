import React, { useContext, useState, useEffect, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import "./NavBar.css"

const Navbar = () => {
    const { token, logout, perfil } = useContext(UserContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target) && 
                buttonRef.current && !buttonRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='navbar'>
            <Link to="/">
                <h3 className='home'>
                    ¡Bienvenido{token && perfil?.nombre ? <span>{perfil.nombre}</span> : ''}!
                </h3>
            </Link>
            <div className='menu-toggle' onClick={toggleMenu} ref={buttonRef}>
                <div className='hamburger'></div>
            </div>
            <div className={`btns ${menuOpen ? 'active' : ''}`} ref={menuRef}>
                {token ? (
                    <>
                        <Link to="/cart" className="me-3">
                            <Button className='btn-view'>Carrito</Button>
                        </Link>
                        <Link to="/purchases" className="me-3">
                            <Button className='btn-view'>Compras</Button>
                        </Link>
                        <Link to="/orders" className="me-3">
                            <Button className='btn-view'>Pedidos</Button>
                        </Link>
                        <Link to="/posts" className="me-3">
                            <Button className='btn-view'>Publicaciones</Button>
                        </Link>
                        <Link to="/profile" className="me-3">
                            <Button className='btn-view'>Perfil</Button>
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