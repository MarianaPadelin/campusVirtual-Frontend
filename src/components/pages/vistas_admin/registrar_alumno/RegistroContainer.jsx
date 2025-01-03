import axios from "axios";
import Registro from "./Registro"
import Swal from "sweetalert2";

//alerta cuando el alumno ya esté registrado

const RegistroContainer = () => {
  // let data = {
  //   nombre: "Test harcodeado",
  //   apellido: "Test harcodeado",
  //   email: "Testharcodeado@gmail.com",
  //   celular: 3344
  // };


  const registrarAlumno = (data) => {
    //el segundo parámetro es lo que quiero mandar en el body del POST
      const promise = axios.post(`/alumnos`, data);

      promise
        .then(() => Swal.fire(`Alumno ${data.nombre} ${data.apellido}registrado con éxito`))
        .catch((err) => console.log("Hubo un error: " + err));

  }

  return (
    <div><Registro registrarAlumno={ registrarAlumno }/></div>
  )
}

export default RegistroContainer