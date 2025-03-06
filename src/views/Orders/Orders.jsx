import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import './Orders.css';

const Orders = () => {
    const { id, token, pedidos, obtenerPedidosBD, confirmarEnvioBD } = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargarDatos = async () => {
            setError(null);
            if (id && token) {
                try {
                    setLoading(true);
                    const resultadoPedidos = await obtenerPedidosBD(id);
                    if (resultadoPedidos.length === 0) {
                        setError("No tienes pedidos actualmente");
                    }
                } catch (error) {
                    console.error("Error al cargar pedidos:", error);
                    setError("No se pudieron cargar los pedidos. Intente nuevamente.");
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        cargarDatos();
    }, [id, token, obtenerPedidosBD]);

    const pedidosAgrupados = pedidos.reduce((acc, pedido) => {
        const existente = acc.find(p => p.idpedido === pedido.idpedido);
        if (!existente) {
            acc.push({
                ...pedido,
                productos: pedidos.filter(p => p.idpedido === pedido.idpedido)
            });
        }
        return acc;
    }, []);

    return (
        <div className='container-pedidos'>
            <h2>Mis pedidos</h2>
            {loading ? (
                <div className='cargar'>Cargando pedidos...</div>
            ) : error ? (
                <div className='error'>
                    <p>{error}</p>
                    <button onClick={() => window.location.reload()}>Reintentar</button>
                </div>
            ) : pedidosAgrupados.length === 0 ? (
                <div className='no-pedidos'>
                    <p>No tienes pedidos actualmente</p>
                </div>
            ) : (
                <div className='pedidos'>
                    {pedidosAgrupados.map((pedidoGrupo) => (
                        <div 
                            key={`pedido-${pedidoGrupo.idpedido}`}
                            className='pedido-grupo'
                        >
                            <div className='encabezado-pedido'>
                                <h3>Pedido #{pedidoGrupo.idpedido}</h3>
                                <p>Comprador: {pedidoGrupo.nombrecomprador}</p>
                                <p>Dirección: {pedidoGrupo.direccioncomprador}</p>
                            </div>
                            
                            {pedidoGrupo.productos.map((producto) => (
                                <div
                                    key={`${producto.idpedido}-${producto.idproducto}`}
                                    className='pedido-detalle'
                                >
                                    {producto.urlimagen && (
                                        <div className='img-pedido'>
                                            <img src={producto.urlimagen} alt={producto.nombre} />
                                        </div>
                                    )}
                                    <div className='info-pedido'>
                                        <h4>{producto.nombre}</h4>
                                        <span>Estado: {producto.estado}</span>
                                        
                                        <p><span className="font-medium">Cantidad:</span> {producto.cantidad}</p>
                                        <p><span className="font-medium">Precio unitario:</span> ${producto.precio.toLocaleString()}</p>
                                        <p><span className="font-medium">Precio total:</span> ${(producto.precio * producto.cantidad).toLocaleString()}</p>
                                        
                                        {producto.estado !== 'Enviado' && (
                                            <button
                                                onClick={() => confirmarEnvioBD(producto.iddetalle, "Enviado")}
                                            >
                                                Enviar pedido
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;