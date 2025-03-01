import { createContext, useContext, useEffect, useState} from "react";
import { UserContext } from "./UserContext";
const API_URL = import.meta.env.VITE_BACKEND_URL;

export const CartContext = createContext();

const CartProvider = ({children}) => {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const {id} = useContext(UserContext);

    useEffect(() => {
        if (id) {
            obtenerCarritoRemoto();
        } else {
            obtenerCarritoLocal();
        }
    }, [id]);
    useEffect(()=>{
        const nuevoTotal = cart.reduce((sum,item) => sum + (item.precio * item.cantidad),0)
        setTotal(nuevoTotal);
    },[cart]);
    const obtenerCarritoLocal = () => {
        const carritoLocal = localStorage.getItem('cart');
        if(carritoLocal){
            setCart(JSON.parse(carritoLocal));
        }
    }
    const obtenerCarritoRemoto = async(userId) =>{
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/api/cart/${userId || id}`,{
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            });
            if(!response.ok){
                throw new Error(`Error status:${response.status}`)
            }
            const data = await response.json();
            setCart(data); 
        } catch (error) {
            console.log("Error al obtener carrito",error);
        }
        
    }
    const añadirItemBD = async(producto) =>{
        if(id){
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${API_URL}/api/cart`,{
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        idUsuario:id,
                        idProducto: producto.idproducto,
                        cantidad:1
                    })
                })
                if(response.ok){
                    await obtenerCarritoRemoto();
                }
                else{
                    const error = await response.json();
                    throw new Error(error.error || 'Error al añadir al carrito');
                }
            } catch (error) {
                console.error("Error al añadir al carrito",error);
                throw error;
            }
        }
        else{
            let carritoActualizado = [...cart];
            const productoExistente = carritoActualizado.find(item => item.idproducto === producto.idproducto);
            if(productoExistente){
                productoExistente.cantidad += 1;
            }
            else{
                carritoActualizado.push({
                    ...producto,
                    cantidad:1
                })
            }
            setCart(carritoActualizado);
            localStorage.setItem('cart',JSON.stringify(carritoActualizado));
        }
    } 
    const eliminarItemBD = async(producto,eliminarTodo = false)=>{
        if(id){
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${API_URL}/api/cart/item`,{
                    method:'DELETE',
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        idUsuario: id,
                        idProducto: producto.idproducto
                    })
                })
                if(response.ok){
                    await obtenerCarritoRemoto();
                }
                else{
                    const error = await response.json();
                    throw new Error(error.error || 'Error al eliminar del carrito');
                }
            } catch (error) {
                console.log("Error al eliminar producto",error);
                throw error;
            }
            
        }
        else{
            let carritoActualizado = [...cart];
            const indexItem = carritoActualizado.findIndex(i => i.idproducto === producto.idproducto);
            if(indexItem !== -1){
                if(carritoActualizado[indexItem].cantidad > 1){
                    carritoActualizado[indexItem].cantidad -= 1;
                }
                else{
                    carritoActualizado.splice(indexItem,1);
                }
                setCart(carritoActualizado);
                localStorage.setItem('cart',JSON.stringify(carritoActualizado));
            }
        }
    }
    const realizarCompra = async (datosComprador = null) => {
        try {
            if (cart.length === 0) {
                alert('El carro está vacío, no puedes comprar.');
                return null;
            }
            
            let response;
            
            if (id) {
                const token = localStorage.getItem('token');
                response = await fetch(`${API_URL}/api/pedidos`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        idUsuario: id,
                        items: cart,
                        total
                    })
                });
            } else {
                if (!datosComprador) {
                    return { requiresForm: true };
                }
                
                response = await fetch(`${API_URL}/api/pedidos/invitado`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        comprador: datosComprador,
                        items: cart,
                        total
                    })
                });
            }
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al procesar la compra');
            }
            
            const result = await response.json();
            vaciarCarrito();
            return result;
        } catch (error) {
            console.error('Error al realizar compra:', error);
            throw error;
        }
    };
    const vaciarCarrito = async() =>{
        if(id){
            try {
                const token = localStorage.getItem('token');
                await fetch(`${API_URL}/api/cart/usuario/${id}`,{
                    method: 'DELETE',
                    headers:{
                        'Authorization': `Bearer ${token}`
                    }
                });
                setCart([]);
            } catch (error) {
                console.error('Error al vaciar el carrito:',error);
            }
        }
        else{
            localStorage.removeItem('cart');
            setCart([]);
        }
    }
    return(
        <CartContext.Provider value={{cart,total,añadirItemBD,eliminarItemBD,realizarCompra}}>
            {children}
        </CartContext.Provider>
    )
}
export default CartProvider;