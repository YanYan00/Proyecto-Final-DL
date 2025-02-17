import React, {useContext} from 'react'
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

const Navbar = () => {
    const {token,logout} = useContext(UserContext);
    return(
        <div className='navbar'>
            <div className='nav'>
                <Link to="/"><h3>¡Bienvenido a Nanomarket!</h3></Link>
                <Link to="/cart" className="me-3"><Button variant="outline-light">🛒</Button></Link>
                
                {token ? (
                        <>
                            <Link to="/bookmarks" className="me-3">
                                <Button variant="outline-light">🔖</Button>
                            </Link>
                            <Link to="/posts" className="me-3">
                                <Button variant="outline-light">📑</Button>
                            </Link>
                            <Link to="/profile" className="me-3"><Button variant="warning">Mi Perfil</Button></Link>
                            <Button variant="warning" onClick={logout}>Cerrar Sesión</Button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="me-3"><Button variant="warning">Iniciar Sesión</Button></Link>
                            <Link to="/register"><Button variant="warning">Registrarse</Button></Link>
                        </>
                    )}
            </div>
        </div>
    )
}
export default Navbar;