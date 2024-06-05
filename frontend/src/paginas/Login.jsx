import { useState } from "react";
import {Link} from "react-router-dom";
import useAuth from "../hooks/useAuth.jsx";
import Alerta from "../components/Alerta.jsx";
import clienteAxios from "../config/axios.jsx";

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Iniciando sesion...')

    if([email, password].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
    }

    try {
      const { data } = await clienteAxios.post('/veterinarios/login', {email, password});

      console.log(data);

      localStorage.setItem('token', data.token);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error:true
      })
    }
  }

  const { msg } = alerta;

  return (
    <>
        <div>
          <h1 className="text-indigo-600 font-black text-6xl">Inicia Sesión y Administra tus <span className="text-black">Pacientes</span></h1>
        </div>
        <div className="mt-20 md:mt-5 shadow-lg px-5 my-10 bg-white">
          {msg && <Alerta 
            alerta={alerta}
          />}
          <form onSubmit={handleSubmit}>
            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">Email</label>
              <input 
              type="email" 
              placeholder="Email de registro"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={email}
              onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">Password</label>
              <input 
              type="password" 
              placeholder="Contraseña"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={password}
              onChange={e => setPassword(e.target.value)}
              />
            </div>
            <input 
            type="submit" 
            value="Iniciar Sesión"
            className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
            />
          </form>

          <nav className="mt-10 lg:flex lg:justify-between">
            <Link 
            to="/registrar"
            className="block text-center my-5 text-gray-500"
            >¿No tienes una cuenta? Regístrate</Link>
            <Link 
            to="/olvide-password"
            className="block text-center my-5 text-gray-500"
            >Olvide mi contraseña</Link>
          </nav>
        </div>
    </>
  )
}

export default Login