import { useParams } from "react-router-dom"
import Historial from "./Historial"
import { useEffect, useState } from "react";
import axios from "axios";

const HistorialContainer = () => {
    const { id } = useParams()
    const [alumno, setAlumno] = useState({});
    
    console.log(alumno.pagos)

     useEffect(() => {
       const promise = axios.get(`/alumnos/getById/${id}`);
       promise
         .then((res) => setAlumno(res.data.alumno))
         .catch((err) => console.log("Hubo un error: " + err));
     }, [id]);

  return (
    <><Historial alumno={alumno} /></>
  )
}

export default HistorialContainer