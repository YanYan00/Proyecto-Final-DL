import { useState } from 'react'
import './NewPost.css'
import { Button, Row, Col} from 'react-bootstrap'

const NewPost = () => {
    const [data,setData] = useState({
        sku:'',
        descripcion:'',
        precio:0,
        stock:0,
        nombre:'',
        fechaCreacion:'',
        idCategoria:''
    });
    <>
        <Row className="row">
            <Col><input type="text" name="text" value={data.sku} onChange={handleChange}/>Sku</Col>
        </Row>
        <Row className="row">
            <Col><input type="text" name="text" value={data.descripcion} onChange={handleChange}/>Descripcion</Col>
        </Row>
        <Row className="row">
            <Col><input type="text" name="text" value={data.precio} onChange={handleChange}/>Precio</Col>
        </Row>
        <Row className="row">
            <Col><input type="text" name="text" value={data.stock} onChange={handleChange}/>Descripcion</Col>
        </Row>
        <Row className="row">
            <Col><input type="text" name="text" value={data.nombre} onChange={handleChange}/>Descripcion</Col>
        </Row>
        <Row className="row">
            <Col><input type="text" name="text" value={data.fechaCreacion} onChange={handleChange}/>Descripcion</Col>
        </Row>
        <Row className="row">
            <Col><input type="text" name="text" value={data.idCategoria} onChange={handleChange}/>Categoria</Col>
        </Row>
        <Button>Publicar</Button>
    </>
    

}
export default NewPost;