import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();
const UserProvider = ({children}) => {
    const [email, setEmail] = useState(null);
    const [token, setToken] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.getItem('token');
        const tokenStorage = localStorage.getItem('token')
        if(tokenStorage){
            setToken(tokenStorage)
        }
    },[])

    const login = async (email, password) => {
        try {
            const loginData = {
                correo: email,
                password: password
            };
            console.log('Datos a enviar:', loginData);
    
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });
    
            const data = await response.json();
            console.log('Respuesta del servidor:', {
                status: response.status,
                data: data
            });
    
            if (!response.ok) {
                throw new Error(data.message || 'Error de autenticación');
            }
    
            if (data.token) {
                localStorage.setItem('token', data.token);
                setToken(data.token);
                setEmail(data.user.correo);
                navigate('/nanomarket');
            }
        } catch (error) {
            console.error('Error completo:', {
                message: error.message,
                details: error
            });
        }
    }
    
    const logout = () => {
        localStorage.removeItem('token')
        setToken(null)
        setEmail(null)
        navigate('/nanomarket')
    }
    return(
        <UserContext.Provider value={{token,email,login,logout}}>
            {children}
        </UserContext.Provider>
    )
}
export default UserProvider