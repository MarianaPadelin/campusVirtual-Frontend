import { useEffect, useState } from "react";
import RegistrarNotas from "./RegistrarNotas"
import axios from "axios";

const RegistrarNotasContainer = () => {
  const [alumnos, setAlumnos] = useState([]);

  useEffect(() => {
    const promise = axios.get(`/alumnos`);
    promise
      .then((res) => setAlumnos(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <><RegistrarNotas alumnos={alumnos} /></>
  )
}

export default RegistrarNotasContainer