import { createContext, useState, useEffect } from "react";
const API_URL = import.meta.env.VITE_BACKEND_URL;

export const ItemsContext = createContext();
const ItemsProvider = ({children})=>{     
    const [items,setItems] = useState([]);
    const [categorias,setCategorias] = useState([]);
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
            const response = await fetch(`${API_URL}/api/categorias`);
            const data = await response.json();
            setCategorias(data);
        } catch (error) {
            console.error("Error:", error);
        }
    };
    useEffect(() => {
        consultarBD();
        obtenerCategoriasBD();
    }, []);

    return(
        <ItemsContext.Provider value={{items,categorias,consultarBD,obtenerCategoriasBD}}>
            {children}
        </ItemsContext.Provider>
    )
}
export default ItemsProvider;