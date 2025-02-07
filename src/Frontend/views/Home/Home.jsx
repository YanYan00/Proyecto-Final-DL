import { Link } from "react-router-dom";
import CardItem from "../../components/CardItem/CardItem";
import { useContext } from "react";
import { ItemsContext } from "../../context/ItemsContext";
import './Home.css'
import { CartContext } from "../../context/CartContext";


const Home = () => {
  const { items } = useContext(ItemsContext);
  const {añadirItem} = useContext(CartContext);
  return (
    <div className="text-center mt-10">
      <div className="cards">
        {items.map((item,index)=>(
          <CardItem item={item} key={index} añadirItem ={añadirItem}/>
        ))}
      </div>
    </div>
  );
};

export default Home;
