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
    <form className="loginForm" onSubmit={(e) => handleLoginSubmit(e,data)}>
      <h2>Inicio de Sesión</h2>
      <Row className="row">
        <Col><input type="email" name="email" value={data.email} onChange={handleChange}/></Col>
      </Row>
      <Row className="row">
        <Col><input type="password" name="password" value={data.password} onChange={handleChange}></input></Col>
      </Row>
      <Button className='send-button' type='submit'>Enviar</Button>
    </form>
    
  );
};

export default LoginPage;
