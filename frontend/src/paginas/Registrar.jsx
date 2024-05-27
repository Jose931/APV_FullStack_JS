import {Link} from "react-router-dom";
import {useState} from "react";
import Alerta from "../components/Alerta.jsx";

const Registrar = () => {

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');
  const [alerta, setAlerta] = useState('');

  const handleSubmit = e=> {
    e.preventDefault();

    if([nombre, email, password, repetirPassword].includes('')){
      setAlerta({msg: 'Hay campos vacios', error: true});
      return;
    }

    if(password !== repetirPassword){
      setAlerta({msg: 'Las contraseñas NO son iguales', error: true});
      return;
    }

    if(password.length < 6) {
      setAlerta({msg: 'La contraseña es muy corta, mínimo 6 caracteres', error: true});
    }
    setAlerta({});
  }

  const {msg} = alerta;

  return (
   <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">Crea tu Cuenta y Administra tus <span className="text-black">Pacientes</span></h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 my-10 bg-white">

          <form onSubmit={handleSubmit}>
            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">Nombre</label>
              <input 
              type="text" 
              placeholder="Tu Nombre"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              />
            </div>
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
              <label className="uppercase text-gray-600 block text-xl font-bold">Contraseña</label>
              <input 
              type="password" 
              placeholder="Tu contraseña"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={password}
              onChange={e=> setPassword(e.target.value)}
              />
              <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">Repetir Contraseña</label>
              <input 
              type="password" 
              placeholder="Repite tu contraseña"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={repetirPassword}
              onChange={ e => setRepetirPassword(e.target.value)}
              />
            </div>
            </div>
            {msg && <Alerta 
              alerta={alerta}
            />}
            <input 
            type="submit" 
            value="Crear Cuenta"
            className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
            />
          </form>
          <nav className="mt-10 lg:flex lg:justify-between">
            <Link 
            to="/"
            className="block text-center my-5 text-gray-500"
            >¿Ya tienes una cuenta? Inicia Sesión</Link>
            <Link 
            to="/olvide-password"
            className="block text-center my-5 text-gray-500"
            >Olvide mi contraseña</Link>
          </nav>
      </div>
   </>
  )
}

export default Registrar