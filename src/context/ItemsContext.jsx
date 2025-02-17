import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_BACKEND_URL;

export const ItemsContext = createContext();
const ItemsProvider = ({children})=>{     
    const [items,setItems] = useState([]);
    const [categorias,setCategorias] = useState([]);
    const navigate = useNavigate(); 

    const consultarBD = async () => {
        try {
            const response = await fetch(`${API_URL}/api/productos`);
            const data = await response.json();
            setItems(data);
        } catch (error) {
            console.error("Error:", error);
        }
    };
    const obtenerCategoriasBD = async () => {
        try {
            const response = await fetch(`${API_URL}:3000/api/categorias`);
            const data = await response.json();
            setCategorias(data);
        } catch (error) {
            console.error("Error:", error);
        }
    };
    const agregarPublicacionBD = async (publicacionData, token) => {
        try {
            const response = await fetch(`${API_URL}/api/publicacion`,{
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
            navigate('/posts');
        } catch (error) {
            console.log('Error en creacion de la publicacion',error);
        }
    }

    useEffect(() => {
        consultarBD();
        obtenerCategoriasBD();
    }, []);

    return(
        <ItemsContext.Provider value={{items,categorias,consultarBD,agregarPublicacionBD,}}>
            {children}
        </ItemsContext.Provider>
    )
}
export default ItemsProvider;