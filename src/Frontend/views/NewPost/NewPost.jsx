import { useContext, useState } from 'react'
import './NewPost.css'
import { Button, Row, Col} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const NewPost = () => {
    const navigate = useNavigate();
    const {agregarPublicacion, handleSubmitNew} = useContext(ItemsContext);
    const [data,setData] = useState({
        sku:'',
        descripcion:'',
        precio:0,
        stock:0,
        nombre:'',
        fechaCreacion:'',
        idCategoria:''
    });
    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };
    <>
        <form onSubmit={handleSubmit} className='new-post'>
            <h2>Nueva Publicación</h2>
            <Row className="row">
                <Col><input type="text" name="text" placeholder='Sku' value={data.sku} onChange={handleChange}/>Sku</Col>
            </Row>
            <Row className="row">
                <Col><input type="text" name="text" placeholder='Descripcion' value={data.descripcion} onChange={handleChange}/>Descripcion</Col>
            </Row>
            <Row className="row">
                <Col><input type="text" name="text" placeholder='Precio' value={data.precio} onChange={handleChange}/>Precio</Col>
            </Row>
            <Row className="row">
                <Col><input type="text" name="text" placeholder='Stock' value={data.stock} onChange={handleChange}/>Descripcion</Col>
            </Row>
            <Row className="row">
                <Col><input type="text" name="text" placeholder='Nombre' value={data.nombre} onChange={handleChange}/>Descripcion</Col>
            </Row>
            <Row className="row">
                <Col><input type="text" name="text" placeholder='Fecha' value={data.fechaCreacion} onChange={handleChange}/>Descripcion</Col>
            </Row>
            <Row className="row">
                <Col><input type="text" name="text" placeholder='Categorias' value={data.idCategoria} onChange={handleChange}/>Categoria</Col>
            </Row>
            <Button>Publicar</Button>            
        </form>

    </>
    

}
export default NewPost;