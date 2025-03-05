import './Orders.css'
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';

const Orders = () =>{
    const {id,token,pedidos,obtenerPedidosBD,confirmarEnvioBD} = useContext(UserContext);
    const [loading,setLoading] = useState(true);
    useEffect(() =>{
        const cargarDatos = async()=>{
            if(id && token){
                setLoading(true);
                try {
                    await obtenerPedidosBD(id);
                } catch (error) {
                    console.error("Error al cargar pedidos:", error);
                } finally {
                    setLoading(false);
                }
            }
        }
        cargarDatos();
    },[id,token,obtenerPedidosBD]);
    useEffect(() => {
        if (pedidos.length > 0) {
            setLoading(false);
        }
    }, [pedidos]);
    return(
        <div className='container-pedidos'>
            <h2>Mis pedidos</h2>;
            {loading ? (
                <div className='cargar'>Cargando pedidos...</div>
            ): pedidos.length===0 ?(
                <div className='no-pedidos'>
                    <p>No tienes pedidos actualmente</p>
                </div>
            ):(
                <div className='pedidos'>
                    {pedidos.map((pedido) =>(
                        <div key={`${pedido.idpedido}-${pedido.idproducto}`} className='pedido'>
                            <div className='detalles-pedido'>
                                {pedido.urlimagen &&(
                                    <div className='img-pedido'>
                                        <img src={pedido.urlimagen} alt={pedido.nombre} />    
                                    </div>
                                    
                                )}
                                <div className='info-pedido'>
                                    <h4>{pedido.nombre}</h4>
                                    <span>{pedido.estado}</span>
                                    <h5>Informacion del cliente</h5>
                                    <p><span className="font-medium">Nombre:</span> {pedido.nombrecomprador}</p>
                                    <p><span className="font-medium">Dirección:</span> {pedido.direccioncomprador}</p>          
                                    <span>Cantidad:{pedido.cantidad}</span>
                                    <p>Precio unitario: ${pedido.precio}</p> 
                                    <p><span>Precio total:</span> ${(pedido.precio * pedido.cantidad).toLocaleString()}</p>
                                    <button onClick={() => confirmarEnvioBD(pedido.iddetalle, "Enviado")}>Enviar pedido</button>
                                </div>     
                            </div>
                        </div>
                    ))}
                </div>
            )}  
        </div>
        
    )
}

export default Orders;