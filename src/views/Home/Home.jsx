import CardItem from "../../components/CardItem/CardItem";
import { useContext, useEffect, useState } from "react";
import { ItemsContext } from "../../context/ItemsContext";
import './Home.css'
import { CartContext } from "../../context/CartContext";
import { Form } from "react-bootstrap";

const Home = () => {
  const [itemsFiltrados,setItemsFiltrados] = useState([]);
  const [botonActivo,setBotonActivo] = useState(null);
  const [buscador,setBuscador] = useState('');
  const [pagina,setPagina] = useState(1);
  const {items,categorias} = useContext(ItemsContext);
  const {añadirItem} = useContext(CartContext);
  const inicio = (pagina-1) * 6;
  const final = inicio + 6 ;

  const actualItems = itemsFiltrados.length >0 ? itemsFiltrados : items;
  const mostrarItems = actualItems.slice(inicio,final);
  useEffect(() =>{
    let filtradas = items;
    if(botonActivo){
      filtradas = filtradas.filter (item => item.categoria === botonActivo.nombre);
    }
    if (buscador) {
      filtradas = filtradas.filter(item => {
      if (!item || (!item.nombre && !item.descripcion)) return false;
      const nombre = item.nombre ? item.nombre.toLowerCase() : '';
      const descripcion = item.descripcion ? item.descripcion.toLowerCase() : '';
      const termino = buscador.toLowerCase();
      return nombre.includes(termino) || descripcion.includes(termino);
      });
    }
    setItemsFiltrados(filtradas);
    setPagina(1);
  },[botonActivo,buscador,items])

  const filtrarItems = (categoria) => {
    if(botonActivo?.nombre === categoria.nombre){
      setBotonActivo(null);
      setBuscador('');
      return;
    }
    setBotonActivo(categoria);
  }

  
  return (
    <div className="text-center mt-10">
      <Form className="d-flex flex-grow-1 mx-4">
        <Form.Control
          type="search"
          placeholder="Buscar productos"
          className="me-2 flex-grow-1"
          aria-label="Search"
          value={buscador}
          onChange={(e) => setBuscador(e.target.value)}
        />
      </Form>
      <div className="menu-cat">
        {categorias.map((categoria,index)=>(
          <button onClick={()=>{filtrarItems(categoria)}} key={index} className={botonActivo?.nombre === categoria.nombre ? 'active' : ''}>{categoria.nombre}</button>
        ))}
      </div>
      <div className="cards">
        {mostrarItems.map((item,index)=>(
          
          <CardItem item={item} key={index} añadirItem ={añadirItem}/>
        ))}
      </div>
      <div className="paginacion">
        <button onClick={() => setPagina(p => p-1)} disabled={pagina===1}>Anterior</button>
        <button onClick={() => setPagina(p => p+1)} disabled={mostrarItems.length<6}>Siguiente</button>
      </div>
    </div>
  );
};

export default Home;
