import { useParams } from "react-router-dom"
import Info from "./Info"
import { useEffect, useState } from "react"

const InfoContainer = () => {
const [alumno, setAlumno] = useState({});
const { id } = useParams()

useEffect(() => {
   const promise = fetch(`http://localhost:8080/alumnos/${id}`);
   promise
     .then((res) => res.json())
     .then((res) => setAlumno(res.alumno[0]))
     .catch((err) => console.log("Hubo un error: " + err));
}, [id])
    //vuelve a hacer la consulta (1 vez) cada vez que cambia el id
    

  return (
    <><Info alumnoEncontrado={alumno} /></>
  )
}

export default InfoContainer