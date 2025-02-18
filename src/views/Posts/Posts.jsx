import { Button } from 'react-bootstrap';
import './Posts.css';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

const Posts = () =>{
    const {id,obtenerPublicacionesBD,posts} = useContext(UserContext);
    useEffect(() =>{
        if(id && token){
            obtenerPublicacionesBD(id);
        }
    },[id,token]);
    if (!posts || posts.length === 0) {
        return (
            <div className='op-publicaciones'>
                <h3>Mis publicaciones</h3>
                <Button >Nueva publicación</Button>
                <p>No tienes publicaciones aún</p>
            </div>
        );
    }
    return (
        <>
            <div className='op-publicaciones'>
                <h3>Mis publicaciones</h3>
                <Button>Nueva publicación</Button>
            </div>
            <div className='publicaciones'>
                {posts.map((item) => (
                    <div key={item.idpublicacion} className='publicacion'>
                        <div className='cont-publicacion'>
                            <h4>{item.titulo}</h4>
                            <p>${item.precio.toLocaleString()}</p>
                            <p>{item.descripcion}</p>
                            <p>Fecha: {new Date(item.fechacrea).toLocaleDateString()}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
export default Posts;