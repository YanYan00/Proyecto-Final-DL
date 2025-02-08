import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ItemsContext = createContext();
const ItemsProvider = ({children})=>{     
    const [items,setItems] = useState([]);
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
    const agregarPublicacion = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/publicacion',{
                method: 'POST',
                headers:{
                    "Content-Type":"application/json"
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
    useEffect(() => {
        consultarBD();
    }, []);
    return(
        <ItemsContext.Provider value={{items,consultarBD,agregarPublicacion}}>
            {children}
        </ItemsContext.Provider>
    )
}
export default ItemsProvider;