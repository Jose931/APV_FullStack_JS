import { useState, useEffect, createContext } from "react";
import { useLocation } from "react-router-dom";
import clienteAxios from "../config/axios.jsx";

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [ cargando, setCargando ] = useState(true);
    const [auth, setAuth] = useState({});

    useEffect(() => {
      const autenticarUsuario = async () => {
        const token = localStorage.getItem('token');

        if(!token){
            setCargando(false);
            return;
        } 

        const config =  {
           headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
           } 
        }

        try {
            const { data } = await clienteAxios('/veterinarios/perfil', config);
            console.log(data);

            setAuth(data);
        } catch (error) {
            console.log(error.response.data.msg);
            setAuth({});
        }

        setCargando(false);
      }
      autenticarUsuario();
    }, [])
    

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext;