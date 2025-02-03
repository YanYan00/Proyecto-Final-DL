import { createContext, useState, useEffect } from "react";

export const ItemsContext = createContext();
const ItemsProvider = ({children})=>{     
    const [items,setItems] = useState([]); 
    const consultarBD = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/productos');
            const data = await response.json();
            setItems(data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        consultarBD();
    }, []);
    return(
        <ItemsContext.Provider value={{items,consultarBD}}>
            {children}
        </ItemsContext.Provider>
    )
}
export default ItemsProvider;