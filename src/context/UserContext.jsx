import { createContext, useState } from "react"

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const [alumno, setAlumno] = useState({})
    console.log(alumno)
    const mostrarDatosAlumno = (info) => {
        setAlumno(info)
    }
    let data = {
        id: alumno._id,
        nombre: alumno.nombre,
        apellido: alumno.apellido,
        email: alumno.email,
        asistencias: alumno.asistencias,
        pagos: alumno.pagos,
        mostrarDatosAlumno
    }

  return (
    <UserContext.Provider value={data}>
        {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider