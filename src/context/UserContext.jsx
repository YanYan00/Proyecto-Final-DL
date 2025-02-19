import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_BACKEND_URL;

export const UserContext = createContext();
const UserProvider = ({children}) => {
    const [email, setEmail] = useState(null);
    const [token, setToken] = useState(null);
    const [id, setId] = useState(null);
    const [perfil,setPerfil] = useState(null);
    const [posts,setPosts] = useState([]);
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
    
            const response = await fetch(`${API_URL}/api/login`, {
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
            navigate("/");
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
        navigate('/');
    }
//----------------------------------------Register--------------------------------------------------
    const register = async (nombre,email, password) =>{
        try {
            const response = await fetch(`${API_URL}/api/register`,{
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
            navigate("/");
        } catch (error) {
            alert(error.message);
            console.error('Error en el registro:', error);
        }
    };
//----------------------------------------Perfil--------------------------------------------------------
    const obtenerPerfilBD = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/api/profile/${id}`,{
                headers:{
                    'Authorization': `Bearer ${token}`}});
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);}          
            const data = await response.json();
            setPerfil(data);
        } catch (error) {
            console.error("Error:", error);
        }
    }
    const actualizarPerfilBD = async (id,datos) =>{
        try {
            const token = localStorage.getItem('token');
            if(!token){
                console.error('Token no encontrado');
                return;
            }
            const dataEnviar ={
                ...datos,
                tipo:datos.password ? 'password' : 'datos'
            }
            const response = await fetch(`${API_URL}/api/profile/${id}`,{
                method: 'PUT',
                headers: {
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(dataEnviar)
            })
            if(!response.ok){
                throw new Error('Error al actualizar perfil');
            }
            const perfilActualizado = await response.json();
            setPerfil(perfilActualizado);
            return perfilActualizado;
        } catch (error) {
            console.error("Error:",error);
            throw error;
        }
    }
//--------------------------------Publicaciones-----------------------------------------------------------------
    
    const obtenerPublicacionesBD = async (id) =>{
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/api/posts/${id}`,{
                headers:{
                    'Authorization': `Bearer ${token}`
            }});
            if(!response.ok){
                throw new Error (`HTTP error! status: ${response.status}`)
            }
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error("Error:",error);            
        }
    }
    const agregarProductoBD = async (productoData) =>{
        try {
            const response = await fetch(`${API_URL}/api/productos`,{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    
                },
                body: JSON.stringify(productoData)
            });
            if(!response.ok){
                throw new Error("Error al crear el producto");
            }
            return await response.json();
        } catch (error) {
            console.error('Error:',error);
            throw error;
        }
    }
    const agregarPublicacionBD = async (publicacionData) => {
        try {
            const response = await fetch(`${API_URL}/api/posts`,{
                method: 'POST',
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(publicacionData),
            });
            if(!response.ok){
                throw new Error("Error al crear publicacion")
            }
            const data = await response.json();
            await obtenerPublicacionesBD(id);
            return data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    return(
        <UserContext.Provider value={{token,email,id,perfil,posts,login,register,logout, handleRegisterSubmit,handleLoginSubmit,obtenerPerfilBD,actualizarPerfilBD,obtenerPublicacionesBD,agregarPublicacionBD,agregarProductoBD}}>
            {children}
        </UserContext.Provider>
    )
}
export default UserProvider