import { useEffect, useState } from 'react';
import HomeAdmin from './HomeAdmin'
// import axios from "axios"; 

const HomeAdminContainer = () => {
  const [alumnos, setAlumnos] = useState([]);

  const URL = "https://campus-virtual-backend.vercel.app";
  // const URL = "http://localhost:3000";
  useEffect(() => {
    const promise = fetch(`${URL}/alumnos`);
    promise
      .then((res) => res.json())
      .then((res) => setAlumnos(res))
      // .then(() => console.log(alumnos))
      .catch((err) => console.log(err));
    // axios.defaults.withCredentials = true;
    // const promise = axios.get("https://localhost:3000/alumnos");
    // promise.then((res) => setAlumnos(res.data).catch(err => console.log(err)))
  }, []);

  const eliminarElemento = () => {
    console.log("Se eliminó al alumno");
  };
  return (
    <>
      <HomeAdmin alumnos={alumnos} eliminarElemento={eliminarElemento} />
    </>
  );
}

export default HomeAdminContainer