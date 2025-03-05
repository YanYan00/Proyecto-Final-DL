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
    const [pedidos,setPedidos]= useState([]);
    const [compras,setCompras]=useState([]);
    const [perfilCargando, setPerfilCargando] = useState(false);
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
    useEffect(() => {
        const cargarPerfil = async () => {
            if (id && token && !perfil && !perfilCargando) {
                setPerfilCargando(true);
                try {
                    await obtenerPerfilBD(id);
                } catch (error) {
                    console.error("Error al cargar perfil automáticamente:", error);
                } finally {
                    setPerfilCargando(false);
                }
            }
        };
        cargarPerfil();
    }, [id, token]);
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
            try {
                await obtenerPerfilBD(data.user.idUsuario);
            } catch (perfilError) {
                console.error("Error al cargar perfil después del login:", perfilError);
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
        setPerfil(null);
        navigate('/');
    }
//----------------------------------------Register--------------------------------------------------
    const register = async (nombre,email, password,telefono,direccion) =>{
        try {
            const response = await fetch(`${API_URL}/api/register`,{
                method: 'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    nombre,
                    email,
                    password,
                    telefono,
                    direccion
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
            if (!registerData.nombre || !registerData.email || !registerData.password || !registerData.confirmPassword || !registerData.telefono || !registerData.direccion) {
                alert("Todos los campos son obligatorios");
                return;
              }
            if (registerData.password !== registerData.confirmPassword) {
                alert("Las contraseñas no coinciden");
                return;
            }
            await register(registerData.nombre, registerData.email, registerData.password,registerData.telefono,registerData.direccion);
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
            return data;
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    }
    const actualizarPerfilBD = async (id,datos) =>{
        try {
            const token = localStorage.getItem('token');
            if(!token){
                console.error('Token no encontrado');
                return;
            }
            let tipo = 'datos';
            if (datos.tipo) {
                tipo = datos.tipo;
            } else if (datos.password) {
                tipo = 'password';
            }
            const dataEnviar = {
                ...datos,
                tipo: tipo
            };
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
    
    const obtenerProductoBD = async (idProducto) =>{
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/api/productos/${idProducto}`,{
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            });
            if(!response.ok){
                throw new Error('Error al obtener el producto')
            }
            return await response.json();
        } catch (error) {
            throw error;
        }
    }
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
            const token = localStorage.getItem('token');
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
            const token = localStorage.getItem('token');
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
    const subirImagenCloudinary = async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'ml_default');
            formData.append('cloud_name', 'djxkdulsx');

            const response = await fetch(
                `https://api.cloudinary.com/v1_1/djxkdulsx/image/upload`,
                {
                    method: 'POST',
                    body: formData
                }
            );

            if (!response.ok) {
                throw new Error('Error al subir la imagen');
            }

            const data = await response.json();
            return data.secure_url;
        } catch (error) {
            console.error('Error subiendo imagen:', error);
            throw error;
        }
    };
    const editarProductoBD = async(id,productData) =>{
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/api/productos/${id}`,{
                method: 'PUT',
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(productData)
            });
            if(!response.ok){
                throw new Error("Error al editar el producto");
            }
            return await response.json();
        } catch (error) {
            throw error;
        }
    }
    const editarPublicacionBD = async(id,postData) =>{
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/api/posts/${id}`,{
                method:'PUT',
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(postData)
            });
            if(!response.ok){
                throw new Error("Error al editar la publicación");
            }
            return await response.json();
        } catch (error) {
            throw error;
        }
    }
    const eliminarProductoBD = async (id)=>{
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/api/productos/${id}`,{
                method: 'DELETE',
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                }
            });
            if(!response.ok){
                throw new Error("Error al eliminar producto");
            }
            return await response.json();
        } catch (error) {
            throw error;
        }
    }
    const eliminarPublicacionBD = async (id)=>{
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/api/posts/${id}`,{
                method: 'DELETE',
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                }
            });
            if(!response.ok){
                throw new Error("Error al eliminar publicacion");
            }
            return await response.json();
        } catch (error) {
            throw error;
        }
    }
//----------------------------------------------------Pedidos---------------------------------------------------------------------------------------------------
    const obtenerPedidosBD = async (id) =>{
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/api/orders/${id}`,{
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                }
            });
            if(!response.ok){
                throw new Error (`HTTP error! status: ${response.status}`)
            }
            const data = await response.json();
            setPedidos(data);
            return data;
        } catch (error) {
            throw error;
        }
    }
    const obtenerComprasBD = async (id) =>{
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/api/purchases/${id}`,{
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                }
            });
            if(!response.ok){
                throw new Error (`HTTP error! status: ${response.status}`)
            }
            const data = await response.json();
            setCompras(data);
            return data;
        } catch (error) {
            throw error;
        }
    }
    const confirmarEnvioBD = async (id,estado) =>{
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/api/orders/${id}`,{
                method: 'PUT',
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({dato:estado})
            });
            if(!response.ok){
                throw new Error("Error al editar la publicación");
            }
            const result = await response.json();
            setPedidos(prevPedidos => 
                prevPedidos.map(pedido => 
                    pedido.iddetalle === id ? {...pedido, estado: estado} : pedido
                )
            );
            return result;
        } catch (error) {
            throw error;
        }
    }
    return(
        <UserContext.Provider value={{token,email,id,perfil,posts,pedidos,compras,login,register,logout, handleRegisterSubmit,handleLoginSubmit,obtenerPerfilBD,actualizarPerfilBD,obtenerProductoBD,obtenerPublicacionesBD,agregarPublicacionBD,agregarProductoBD, subirImagenCloudinary,editarProductoBD,editarPublicacionBD,eliminarProductoBD,eliminarPublicacionBD,obtenerPedidosBD,obtenerComprasBD,confirmarEnvioBD}}>
            {children}
        </UserContext.Provider>
    )
}
export default UserProvider