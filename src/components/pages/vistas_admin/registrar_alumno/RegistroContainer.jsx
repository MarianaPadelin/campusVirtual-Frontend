import axios from "axios";
import Registro from "./Registro"
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

//alerta cuando el alumno ya esté registrado

const RegistroContainer = () => {

  const navigate = useNavigate()

  const { handleSubmit, handleChange, errors } = useFormik({
    //3 parámetros: los valores iniciales, la función con onsubmit, y las validaciones
    initialValues: {
      nombre: "",
      apellido: "",
      email: "",
      celular: "",
    },
    onSubmit: (datosIngresados) => {
      registrarAlumno(datosIngresados);
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      email: Yup.string().required("Campo obligatorio"),
      celular: Yup.number().typeError("Debe ser un número válido"),
    }),
  });

  const registrarAlumno = (data) => {
    //el segundo parámetro es lo que quiero mandar en el body del POST
      const promise = axios.post(`/alumnos`, data);

      promise
        .then(() => Swal.fire(`Alumno ${data.nombre} ${data.apellido}registrado con éxito`))
        .then(navigate("/admin"))
        .catch((err) => console.log("Hubo un error: " + err));

  }

  return (
    <div><Registro handleChange={handleChange} handleSubmit={handleSubmit} errors={errors}/></div>
  )
}

export default RegistroContainer