import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [alumno, setAlumno] = useState({});
  const [rolUsuario, setRolUsuario] = useState({});

  const loginUser = async (data) => {
    try {
      
      await axios.get("/session/ping", { withCredentials: true });
      const res = await axios.post("/session/login", data, {
        withCredentials: true,
      });
      if (res.data.status === 200 || res.data.status === 201) {
        const { role, email } = res.data.user;
        setRolUsuario(role);

        if (role === "alumno") {
          const alumnoRes = await axios.get(`/alumnos/getByEmail/${email}`, {
            withCredentials: true,
          });
          setAlumno(alumnoRes.data.alumno);
          return { success: true, role, message: "Alumno conectado" };
        }

        return { success: true, role, message: "Admin conectado" };
      } else if (res.data.status === 400) {
        throw new Error("El usuario no está registrado");
      } else if (res.data.status === 401) {
        throw new Error("Usuario o contraseña incorrectos");
      } else {
        throw new Error("Error desconocido");
      }
    } catch (error) {
      console.error(error);
      return { success: false, message: error.message };
    }
  };

  // Para cuando se refresca la página
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/user", { withCredentials: true });
        console.log("respuesta de la ruta /user:", res)

        
        if (res.data.user) {
          const { role, email } = res.data.user;
          setRolUsuario(role); // Set the role
          if (role === "alumno") {
            const alumnoRes = await axios.get(`/alumnos/getByEmail/${email}`, {
              withCredentials: true,
            });
            setAlumno(alumnoRes.data.alumno); // Set alumno data
          }
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };
    fetchUser();
  }, []);

  let data = {
    id: alumno._id,
    nombre: alumno.nombre,
    apellido: alumno.apellido,
    email: alumno.email,
    asistencias: alumno.asistencias,
    pagos: alumno.pagos,
    // seteoAlumno,
    // seteoUsuario,
    rolUsuario,
    loginUser,
  };

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
