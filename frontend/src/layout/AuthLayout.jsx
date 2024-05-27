import {Outlet} from "react-router-dom"
const AuthLayout = () => {
  return (
    <>
        <h1>Administrador de pacientes de veterinaria</h1>

        <Outlet />
    </>
  )
}

export default AuthLayout