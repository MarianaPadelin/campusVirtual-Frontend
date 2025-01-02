import { useEffect, useState } from 'react';
import HomeAdmin from './HomeAdmin'
import axios from "axios"; 

const HomeAdminContainer = () => {
  const [alumnos, setAlumnos] = useState([]);


  axios.defaults.withCredentials = true;
  useEffect(() => {
    const promise = axios.get(`/alumnos`)
    promise
      .then((res) => setAlumnos(res.data))
      .catch((err) => console.log(err));
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