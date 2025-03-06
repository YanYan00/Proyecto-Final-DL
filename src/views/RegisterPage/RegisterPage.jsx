import { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import './RegisterPage.css'
const RegisterPage = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    nombre: "",
    confirmPassword: "",
    telefono: "",
    direccion: ""
  }); 
  const { handleRegisterSubmit } = useContext(UserContext);
  const handleChange = (e) => {
      setData({
          ...data,
          [e.target.name]: e.target.value
      });
  };

  return (
    <div className="registro">
      <form onSubmit={(e) => handleRegisterSubmit(e, data)} className="form-registro">
        <h2 className="titulo-registro">Registro de Usuario</h2>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={data.nombre}
          onChange={handleChange}
          className="info-registro"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Correo"
          value={data.email}
          onChange={handleChange}
          className="info-registro"
          required
        />
        <input
          type="tel"
          name="telefono"
          placeholder="Teléfono"
          value={data.telefono}
          onChange={handleChange}
          className="info-registro"
          required
        />
        <textarea
          name="direccion"
          placeholder="Dirección"
          value={data.direccion}
          onChange={handleChange}
          className="info-registro"
          rows="3"
          required
        ></textarea>
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={data.password}
          onChange={handleChange}
          className="info-registro"
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmar Contraseña"
          value={data.confirmPassword}
          onChange={handleChange}
          className="info-registro"
          required
        />
        <button 
          type="submit"
          className="btn-registro">
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
