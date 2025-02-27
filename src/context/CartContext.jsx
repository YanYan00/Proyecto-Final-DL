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
    const obtenerCarritoRemoto = async(id) =>{
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/api/cart/${id}`,{
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
        const token = localStorage.getItem('token');
        if(id){
            try {
                const productoExistente = cart.find(item => item.idproducto === producto.idproducto) 
                if(productoExistente){
                    const response = await fetch(`${API_URL}/api/cart/${productoExistente.idcarrito}`,{
                        method: 'PUT',
                        headers:{
                            'Content-Type':'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            cantidad: productoExistente.cantidad + 1
                        })
                    })
                    if(response.ok){
                        await obtenerCarritoRemoto();
                    }
                }else{
                    const response = await fetch(`${API_URL}/api/cart`,{
                        method:'POST',
                        headers:{
                            'Content-Type':'application/json',
                            'Authorization':`Bearer ${token}`
                        },
                        body: JSON.stringify({
                            idUsuario: id,
                            idProducto: producto.idProducto,
                            cantidad:1
                        })
                    })
                    if(response.ok){
                        await obtenerCarritoRemoto();
                    }
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
    const eliminarItemBD = async(producto)=>{
        const token = localStorage.getItem('token');
        if(id){
            try {
                const itemCart = cart.find(i => i.idProducto === producto.idproducto);
                if(itemCart){
                    if(itemCart.cantidad > 1){
                        const response = await fetch(`${API_URL}/api/cart/${itemCart.idcarrito}`,{
                            method: 'PUT',
                            headers:{
                                'Content-Type':'application/json',
                                'Authorization':`Bearer ${token}`
                            },
                            body: JSON.stringify({
                                cantidad: itemCart.cantidad - 1
                            })
                        })
                        if(response.ok){
                            await obtenerCarritoRemoto();
                        }
                    }
                    else{
                        const response = await fetch(`${API_URL}/api/cart/${itemCart.idcarrito}`,{
                            method:'DELETE',
                            headers:{
                                'Authorization':`Bearer ${token}`
                            }
                        })
                        if(response.ok){
                            await obtenerCarritoRemoto();
                        }
                    }
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
    const realizarCompra = async(datosComprador=null) =>{
        try {
            if(cart.length === 0){
                alert('El carro esta vacio, no puedes comprar.');
            }
            if(id){
                const token = localStorage.getItem('token');
                const response = await fetch(`${API_URL}/api/pedidos`,{
                    method:'POST',
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        idUsuario:id,
                        items:cart,
                        total
                    })
                })
            }
            else{
                if(!datosComprador){
                    return{requiresForm:true};
                }
                const response = await fetch(`${API_URL}/api/pedidos/invitado`,{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        comprador: datosComprador,
                        items:cart,
                        total
                    })
                })
            }
            if(!response.ok){
                const errorData= await response.json();
                throw new Error(errorData.error || 'Error al procesar la compra');
            }
            const result = await response.json();
            vaciarCarrito();
            return result;
        } catch (error) {
            console.error('Error al realizar compra:',error);
            throw error;
        }
    }
    const vaciarCarrito = async() =>{
        if(id){
            try {
                await fetch(`${API_URL}/api/cart/usuario/${id}`,{method: 'DELETE'});
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
        <CartContext.Provider value={{cart,añadirItemBD,eliminarItemBD,realizarCompra,total}}>
            {children}
        </CartContext.Provider>
    )
}
export default CartProvider;