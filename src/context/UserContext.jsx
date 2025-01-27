import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [alumno, setAlumno] = useState({});
  const [rolUsuario, setRolUsuario] = useState({});

  useEffect(() => {
      try {
        const promise = axios.get(`/user`, { withCredentials: true });
        promise.then((res) => {
          if (res.data.user) {
            const userRole = res.data.user.role;
            seteoUsuario(userRole);
            //este queda atrasado

            if (userRole == "alumno") {
              const userMail = res.data.user.email;
              const promise2 = axios.get(`/alumnos/${userMail}`, {
                withCredentials: true,
              });
              promise2
                .then((res) => seteoAlumno(res.data.alumno))
                .catch((err) => console.log(err));
            }
          }
        });
      } catch (error) {
        console.error("Error cargando los datos de usuario: ", error);
      }

  }, []);

  const seteoAlumno = (info) => {
    setAlumno(info);
    // console.log(alumno)
  };

  const seteoUsuario = (info) => {
    setRolUsuario(info);
    // console.log(rolUsuario)
  };

  let data = {
    id: alumno._id,
    nombre: alumno.nombre,
    apellido: alumno.apellido,
    email: alumno.email,
    asistencias: alumno.asistencias,
    pagos: alumno.pagos,
    seteoAlumno,
    seteoUsuario,
    rolUsuario,
  };

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
