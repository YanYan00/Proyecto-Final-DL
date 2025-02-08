import { Button } from 'react-bootstrap';
import './Posts.css';
import { useContext } from 'react';
import { ItemsContext } from '../../context/ItemsContext';
import { useNavigate } from 'react-router-dom';

const Posts = () =>{
    const {agregarPublicacion} = useContext(ItemsContext);
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate('/nanomarket/newposts');
    };
    return (
        <>
            <div className='op-publicaciones'>
                <h3>Mis publicaciones</h3>
                <Button onClick={handleNavigate}>Nueva publicación</Button>
            </div>
            {/* 
                <div className='publicaciones'>
                    {publicaciones.map((item,index) => (
                        <div key={index} className='publicacion'>
                            <div className='cont-publicacion'>
                                <h4>{item.nombre}, ${item.precio.toLocaleString()}</h4>
                            </div>
                        </div>
                    ))}
                </div>
            */} 
        </>    
    )
}
export default Posts;