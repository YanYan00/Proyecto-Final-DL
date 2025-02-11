import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ItemsContext = createContext();
const ItemsProvider = ({children})=>{     
    const [items,setItems] = useState([]);
    const [perfil,setPerfil] = useState(null);
    const navigate = useNavigate(); 

    const consultarBD = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/productos');
            const data = await response.json();
            setItems(data);
        } catch (error) {
            console.error("Error:", error);
        }
    };
    
    const obtenerPerfilBD = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/api/profile/${id}`,{
                headers:{
                    'Authorization': `Bearer ${token}`}});
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);}          
            const data = await response.json();
            setPerfil(data);
        } catch (error) {
            console.error("Error:", error);
        }
    }
    const agregarPublicacionBD = async (publicacionData, token) => {
        try {
            const response = await fetch('http://localhost:3000/api/publicacion',{
                method: 'POST',
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    sku,
                    descripcion,
                    precio,
                    stock,
                    nombre,
                    fechaCreacion,
                    idCategoria
                }),
            });
            const data = await response.json();
        } catch (error) {
            console.log(error);
        }
    }
    const handleSubmitNew = async (e,data) => {
        e.preventDefault();
        try {
            await agregarPublicacion({...data,precio: parseInt(data.precio),stock: parseInt(data.stock),idCategoria: parseInt(data.idCategoria)})
            navigate('/nanomarket/posts');
        } catch (error) {
            console.log('Error en creacion de la publicacion',error);
        }
    }

    useEffect(() => {
        consultarBD();
    }, []);

    return(
        <ItemsContext.Provider value={{items,perfil,consultarBD,agregarPublicacionBD,obtenerPerfilBD}}>
            {children}
        </ItemsContext.Provider>
    )
}
export default ItemsProvider;