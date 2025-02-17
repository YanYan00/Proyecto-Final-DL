import { createContext, useContext, useEffect, useState} from "react";

export const CartContext = createContext();

const CartProvider = ({children}) => {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const añadirItem = (item) => {
        let itemCart = cart.find(i => i.nombre === item.nombre);
        if(itemCart){
            itemCart.cantidad +=1;
            setCart([...cart]);
        }
        else{
            setCart([...cart,{...item,cantidad:1}]);
        }
        setTotal(total + item.precio);
    }
    const eliminarItem = (item) => {
        let itemCart = cart.find(i => i.nombre === item.nombre);
        if(itemCart && itemCart.cantidad > 1){
            itemCart.cantidad -= 1;
            setCart([...cart]);
            setTotal(total - item.precio);
        }
        else if(itemCart && itemCart.cantidad === 1) {
            setCart(cart.filter(i => i.nombre !== item.nombre));
            setTotal(total - itemCart.precio);
        }
    }
    return(
        <CartContext.Provider value={{cart,añadirItem,eliminarItem,total}}>
            {children}
        </CartContext.Provider>
    )
}
export default CartProvider;