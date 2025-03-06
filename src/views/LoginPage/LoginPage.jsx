import React, { useState, useContext } from "react";
import { Button, Col , Row } from "react-bootstrap";
import './LoginPage.css'
import { UserContext } from "../../context/UserContext";

const LoginPage = () => {
  const [data,setData] = useState({
    email:'',
    password:''
  })
  const {handleLoginSubmit} = useContext(UserContext);

  const handleChange = (e) => {
      setData({
          ...data,
          [e.target.name]: e.target.value
      });
  };

  return (
    <div className="form-login">
      <h2 className="titulo-login">Inicio de Sesión</h2>
      <form onSubmit={(e) => handleLoginSubmit(e,data)} className="login-form-container">
        <input 
          type="email" 
          name="email" 
          placeholder="Correo electrónico"
          className="info-login" 
          value={data.email} 
          onChange={handleChange}
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Contraseña"
          className="info-login" 
          value={data.password} 
          onChange={handleChange}
        />
        <button className='btn-login' type='submit'>Enviar</button>
      </form>
    </div>
  );
};

export default LoginPage;
