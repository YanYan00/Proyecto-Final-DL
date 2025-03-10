import './Purchases.css';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';

const Purchases = () => {
    const { id, token, compras, obtenerComprasBD } = useContext(UserContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargarDatos = async () => {
            if (id && token) {
                setLoading(true);
                try {
                    await obtenerComprasBD(id);
                } catch (error) {
                    console.error("Error al cargar compras:", error);
                } finally {
                    setLoading(false);
                }
            }
        };
        
        cargarDatos();
    }, [id, token]);
    return (
        <div className="container-compras">
            <h2>Mis compras</h2>
            {loading ? (
                <div className='cargar'>Cargando compras...</div>
            ) : compras.length === 0 ? (
                <div className='no-pedidos'>
                    <p>No tienes compras actualmente</p>
                </div>
            ) : (
                <div className="compras">
                    {compras.map((compra) => (
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
                                    <h4 className="font-bold text-lg">{compra.nombre}</h4>
                                    <span>{compra.estado}</span>
                                    {compra.nombrevendedor && (
                                    <p>Vendedor: <span>{compra.nombrevendedor}</span></p>)}
                                    <p><span>Cantidad: </span>{compra.cantidad}</p>
                                    <p>Precio unitario: ${compra.precio}</p>
                                    <p><span>Precio total: </span> ${(compra.precio * compra.cantidad).toLocaleString()} </p>
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