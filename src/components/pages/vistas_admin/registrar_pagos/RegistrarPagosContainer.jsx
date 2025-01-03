import { useEffect, useState } from "react";
import RegistrarPagos from "./RegistrarPagos";
import axios from "axios";

const RegistrarPagosContainer = () => {
  const [alumnos, setAlumnos] = useState([]);

  useEffect(() => {
    const promise = axios.get(`/alumnos`);
    promise
      .then((res) => setAlumnos(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <RegistrarPagos alumnos={alumnos} />
    </div>
  );
};

export default RegistrarPagosContainer;
