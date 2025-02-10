import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();
const UserProvider = ({children}) => {
    const [email, setEmail] = useState(null);
    const [token, setToken] = useState(null);
    const [id, setId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.getItem('token');
        const tokenStorage = localStorage.getItem('token')
        const userIdStorage = localStorage.getItem('id')
        if(tokenStorage){
            setToken(tokenStorage);
            setId(userIdStorage);
        }
    },[])
//----------------------------------Login-----------------------------
    const login = async (email, password) => {
        try {
            const loginData = {
                correo: email,
                password: password
            };
    
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });
    
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Error de autenticación');
            }
    
            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('id',data.user.idUsuario);
                setToken(data.token);
                setEmail(data.user.correo);
                setId(data.user.idUsuario);
            }
        } catch (error) {
            console.error('Error completo:', {
                message: error.message,
                details: error
            });
        }
    }
    const handleLoginSubmit = async (e, loginData) => {
        e.preventDefault();
        try {
            await login(loginData.email, loginData.password);
            navigate("/nanomarket");
        } catch (error) {
            console.error('Error en el login:', error);
        }
    };
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        setToken(null);
        setEmail(null);
        setId(null);
        navigate('/nanomarket');
    }
//----------------------------------------Register--------------------------------------------------
    const register = async (nombre,email, password) =>{
        try {
            const response = await fetch('http://localhost:3000/api/register',{
                method: 'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    nombre,
                    email,
                    password
                }),
            });
            const data = await response.json();
            if(!response.ok){
                throw new Error(data.error);
            }
            return data;
        } catch (error) { 
            console.log(error);
        }
    }
    const handleRegisterSubmit = async (e, registerData) => {
        e.preventDefault();
        try {
            if (registerData.password !== registerData.confirmPassword) {
                alert("Las contraseñas no coinciden");
                return;
            }
            await register(registerData.nombre, registerData.email, registerData.password);
            await login(registerData.email, registerData.password);
            navigate("/nanomarket");
        } catch (error) {
            alert(error.message);
            console.error('Error en el registro:', error);
        }
    };
    return(
        <UserContext.Provider value={{token,email,id,login,register,logout, handleRegisterSubmit,handleLoginSubmit}}>
            {children}
        </UserContext.Provider>
    )
}
export default UserProvider