import { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import './RegisterPage.css'
const RegisterPage = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    nombre: "",
    confirmPassword: ""
  }); 
  const { handleRegisterSubmit } = useContext(UserContext);
  const handleChange = (e) => {
      setData({
          ...data,
          [e.target.name]: e.target.value
      });
  };

  return (
      <div className="max-w-md mx-auto mt-10 p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Registro</h2>
        <form onSubmit={(e) => handleRegisterSubmit(e, data)}>
          <h2>Registro de Usuario</h2>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={data.nombre}
            onChange={handleChange}
            className="w-full p-2 mb-3 border rounded"
            required/>
          <input
            type="email"
            name="email"
            placeholder="Correo"
            value={data.email}
            onChange={handleChange}
            className="w-full p-2 mb-3 border rounded"
            required/>
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={data.password}
            onChange={handleChange}
            className="w-full p-2 mb-3 border rounded"
            required/>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmar Contraseña"
            value={data.confirmPassword}
            onChange={handleChange}
            className="w-full p-2 mb-3 border rounded"
            required/>
          <button 
            type="submit" 
            className="w-full bg-green-500 text-white p-2 rounded">
            Registrarse</button>
          </form>
      </div>
    );
};

export default RegisterPage;
