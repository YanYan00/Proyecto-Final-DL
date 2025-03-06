import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import './Purchases.css';

const Purchases = () => {
    const { id, token, compras, obtenerComprasBD } = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargarDatos = async () => {
            setError(null);
            if (id && token) {
                try {
                    setLoading(true);
                    await obtenerComprasBD(id);
                } catch (error) {
                    console.error("Error al cargar compras:", error);
                    setError("No se pudieron cargar las compras. Intente nuevamente.");
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        cargarDatos();
    }, [id, token, obtenerComprasBD]);

    return (
        <div className="container-compras">
            <h2>Mis compras</h2>
            {loading ? (
                <div className='cargar'>Cargando compras...</div>
            ) : error ? (
                <div className='error'>
                    <p>{error}</p>
                    <button onClick={() => window.location.reload()}>Reintentar</button>
                </div>
            ) : compras.length === 0 ? (
                <div className='no-pedidos'>
                    <p>No tienes compras actualmente</p>
                </div>
            ) : (
                <div className="compras">
                    {compras.map((compra) => (
                        <div 
                            key={`${compra.idpedido}-${compra.idproducto}`} 
                            className="compra"
                        >
                            <div className="detalle-compra">
                                {compra.urlimagen && (
                                    <div className="img-compra">
                                        <img
                                            src={compra.urlimagen}
                                            alt={compra.nombre}
                                        />
                                    </div>
                                )}
                                <div className="info-compra">
                                    <h4>{compra.nombre}</h4>
                                    <span className="estado-compra">{compra.estado}</span>
                                    
                                    {compra.nombrevendedor && (
                                        <p><span>Vendedor: </span>{compra.nombrevendedor}</p>
                                    )}
                                    
                                    <p><span>Cantidad: </span>{compra.cantidad}</p>
                                    <p><span>Precio unitario: </span>${compra.precio.toLocaleString()}</p>
                                    <p><span>Precio total: </span>${(compra.precio * compra.cantidad).toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Purchases;