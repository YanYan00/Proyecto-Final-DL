import { createContext, useContext, useEffect, useState} from "react";
import { UserContext } from "./UserContext";
import { ItemsContext } from "./ItemsContext";
const API_URL = import.meta.env.VITE_BACKEND_URL;

export const CartContext = createContext();

const CartProvider = ({children}) => {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const {id,perfil,obtenerPedidosBD,obtenerComprasBD} = useContext(UserContext);
    const {items,consultarBD} = useContext(ItemsContext);

    useEffect(() => {
        if (id) {
            obtenerCarritoRemoto();
        } else {
            obtenerCarritoLocal();
        }
    }, [id]);
    useEffect(() => {
        const nuevoTotal = cart.reduce((sum, item) => {
            if (item.precio) {
                return sum + (item.precio * item.cantidad);
            }
            const productoCompleto = items?.find(p => p.idproducto === item.idproducto);
            if (productoCompleto) {
                return sum + (productoCompleto.precio * item.cantidad);
            }
            return sum;
        }, 0);
        setTotal(nuevoTotal);
    }, [cart, items]);
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
        const productoActualizado = items.find(item => item.idproducto === producto.idproducto);
        const stockActual = productoActualizado ? productoActualizado.stock : 0;
        if (stockActual <= 0) {
            alert('Este producto no tiene stock disponible');
            return;
        }
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
                if (productoExistente.cantidad >= stockActual) {
                    alert(`No puedes añadir más unidades. Stock disponible: ${stockActual}`);
                    return;
                    }
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
    const eliminarItemBD = async(producto)=>{
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
            
            const itemsCompletos = cart.map(item => {
                const productoCompleto = items.find(p => p.idproducto === item.idproducto);
                return {
                    ...item,
                    idproducto: Number(item.idproducto),
                    idusuario: productoCompleto ? Number(productoCompleto.idusuario) : null,
                    precio: productoCompleto?.precio || item.precio
                };
            });
            let response;
            
            if (id) {
                const token = localStorage.getItem('token');
                const userData = perfil ? {
                    nombre: perfil.nombre,
                    email: perfil.correo,
                    telefono: perfil.telefono,
                    direccion: perfil.direccion
                } : null;
                response = await fetch(`${API_URL}/api/pedidos`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        idComprador: id,
                        items: itemsCompletos,
                        total,
                        userInfo: userData
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
                        items: itemsCompletos,
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
            consultarBD();
            obtenerPedidosBD(id);
            obtenerComprasBD(id);
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
        <CartContext.Provider value={{cart,total,añadirItemBD,eliminarItemBD,realizarCompra,vaciarCarrito}}>
            {children}
        </CartContext.Provider>
    )
}
export default CartProvider;