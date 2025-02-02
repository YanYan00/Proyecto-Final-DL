import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold">Bienvenido al MarketPlace</h1>
      <div className="mt-4">
        <Link to="/login" className="text-blue-500 mr-4">Iniciar Sesión</Link>
        <Link to="/register" className="text-green-500">Registrarse</Link>
      </div>
    </div>
  );
};

export default Home;
