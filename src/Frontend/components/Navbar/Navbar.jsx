import React, {useContext} from 'react'
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

const Navbar = () => {
    const {token,logout} = useContext(UserContext);
    return(
        <div className='navbar'>
            <div className='nav'>
                <Link to="/nanomarket"><h3>¡Bienvenido a Nanomarket!</h3></Link>
                <Form className="d-flex flex-grow-1 mx-4">
                    <Form.Control
                        type="search"
                        placeholder="Buscar productos"
                        className="me-2 flex-grow-1"
                        aria-label="Search"
                    />
                    <Button variant="outline-light">
                        <i className="bi bi-search">🔍</i>
                    </Button>
                </Form>
                <Link to="/nanomarket/cart" className="me-3"><Button variant="outline-light">🛒</Button></Link>
                
                {token ? (
                        <>
                            <Link to="/nanomarket/bookmarks" className="me-3">
                                <Button variant="outline-light">🔖</Button>
                            </Link>
                            <Link to="/nanomarket/menu" className="me-3">
                                <Button variant="outline-light">📑</Button>
                            </Link>
                            <Link to="/nanomarket/profile" className="me-3"><Button variant="warning">Mi Perfil</Button></Link>
                            <Button variant="warning" onClick={logout}>Cerrar Sesión</Button>
                        </>
                    ) : (
                        <>
                            <Link to="/nanomarket/login" className="me-3"><Button variant="warning">Iniciar Sesión</Button></Link>
                            <Link to="/nanomarket/register"><Button variant="warning">Registrarse</Button></Link>
                        </>
                    )}
            </div>
        </div>
    )
}
export default Navbar;