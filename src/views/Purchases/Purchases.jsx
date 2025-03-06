import './Purchases.css';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';

const Purchases = () => {
    const { id, token, compras, obtenerComprasBD } = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const [comprasLocales, setComprasLocales] = useState([]);
    
    useEffect(() => {
        const cargarDatos = async () => {
            if (id && token) {
                setLoading(true);
                try {
                    await obtenerComprasBD(id);
                    setLoading(false);
                } catch (error) {
                    console.error("Error al cargar compras:", error);
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };
        cargarDatos();
    }, [id, token, obtenerComprasBD]);
    
    useEffect(() => {
        setComprasLocales(compras);
    }, [compras]);
    
    return (
        <div className="container-compras">
            <h2>Mis compras</h2>
            {loading ? (
                <div className='cargar'>Cargando compras...</div>
            ) : comprasLocales.length === 0 ? (
                <div className='no-pedidos'>
                    <p>No tienes compras actualmente</p>
                </div>
            ) : (
                <div className="compras">
                    {comprasLocales.map((compra) => (
                        <div key={`${compra.idpedido}-${compra.idproducto}`} className="compra">
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