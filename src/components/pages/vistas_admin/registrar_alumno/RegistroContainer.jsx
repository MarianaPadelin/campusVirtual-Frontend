import axios from "axios";
import Registro from "./Registro"
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

//alerta cuando el alumno ya esté registrado

const RegistroContainer = () => {

  const navigate = useNavigate()

  const registrarAlumno = (data) => {
    //el segundo parámetro es lo que quiero mandar en el body del POST
      const promise = axios.post(`/alumnos`, data);

      promise
        .then(() => Swal.fire(`Alumno ${data.nombre} ${data.apellido}registrado con éxito`))
        .then(navigate("/admin"))
        .catch((err) => console.log("Hubo un error: " + err));

  }

  return (
    <div><Registro registrarAlumno={ registrarAlumno }/></div>
  )
}

export default RegistroContainer