import { useParams } from "react-router-dom"
import Info from "./Info"
import { useEffect, useState } from "react"
import axios from "axios"
import Loader from "../../../common/loader/Loader"

const InfoContainer = () => {
const [alumno, setAlumno] = useState({});
const { id } = useParams()


useEffect(() => {
   const promise = axios.get(`/alumnos/${id}`);
   promise
     .then((res) => setAlumno(res.data.alumno[0]))
     .catch((err) => console.log("Hubo un error: " + err));
}, [id])
    //vuelve a hacer la consulta (1 vez) cada vez que cambia el id
    

  return (
    <>
    {alumno._id ? (
    <Info alumnoEncontrado={alumno} />) : ( <Loader />)}</>
  )
}

export default InfoContainer