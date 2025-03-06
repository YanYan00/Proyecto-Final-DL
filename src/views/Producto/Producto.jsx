import { useEffect,useState,useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { ItemsContext } from "../../context/ItemsContext";
import { UserContext } from "../../context/UserContext";
import { Button, Col, Container, Row } from "react-bootstrap";

const Producto = () =>{
    const {id} = useParams();
    const navigate = useNavigate();
    const [producto, setProducto] = useState(null);
    const {items} = useContext(ItemsContext);
    const {añadirItemBD} = useContext(CartContext);
    const { id: idUsuario } = useContext(UserContext);
    useEffect(()=>{
        const productoEncontrado = items.find(item => item.idproducto.toString() === id);
        if(productoEncontrado){
            setProducto(productoEncontrado);
        }
        else{
            console.error('Producto no encontrado');
        }
    },[id,items]);
    const handleAddToCart = async() =>{
        try {
            if(!producto) return;
            await añadirItemBD(producto);
            alert('Producto añadido al carrito');
        } catch (error) {
            console.error('Error al añadir al carrito',error);
            alert('Error al añadir al carrito');
        }
        
    }
    const handleBuy = async() =>{
        if(producto){
            try {
                await añadirItemBD(producto);
                navigate('/cart');
            } catch (error) {
                console.error('Error',error);
                alert('Error al añadir el producto al carrito');
            }
            
        
        }
    }
    if(!producto){
        return <p>Cargando...</p>;
    }
    const productoPropio = producto && producto.idusuario === parseInt(idUsuario);
    return (
        <Container className="producto">
            <Row className="cont-producto">
                <Col>
                    {producto.urlimagen ? (
                        <img
                            src={producto.urlimagen}
                            alt={producto.nombre}
                            className="img-producto"
                        />
                    ) : (
                        <img
                            src="https://via.placeholder.com/400?text=Sin+imagen"
                            alt="Sin imagen"
                            className="w-100"
                        />
                    )}
                </Col>
                <Col>
                    <h2>{producto.nombre}</h2>
                    <h3>{producto.precio?.toLocaleString()}</h3>
                    <h3>Categoria:{producto.categoria}</h3>
                    <p>{producto.descripcion}</p>
                    <p><strong>Stock disponible:</strong> {producto.stock} unidades</p>
                    {productoPropio ? (
                        <>
                            <alert>Este es tu producto, no puedes comprarlo</alert>
                            <div className="btns-compra">
                                <Button className="option-btn" disabled={true}>
                                    Añadir al carrito
                                </Button>
                                <Button className="option-btn" disabled={true}>
                                    Comprar ahora
                                </Button>
                            </div>
                        </>
                    ):(
                        <div className="btns-compra">
                            <Button  className="option-btn" onClick={handleAddToCart} disabled={producto.stock <= 0}>
                                {producto.stock <= 0 ? 'Sin stock disponible' : 'Añadir al carrito'}
                            </Button>
                            <Button className="option-btn" onClick={handleBuy} disabled={producto.stock <= 0} >
                                Comprar ahora
                            </Button>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    )
}

export default Producto;