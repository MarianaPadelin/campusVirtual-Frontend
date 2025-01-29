import AgregarClase from "./AgregarClase";
import { useFormik } from "formik";
// import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";

const AgregarClaseContainer = () => {

  const formik = useFormik({
    //3 parámetros: los valores iniciales, la función con onsubmit, y las validaciones
    initialValues: {
      nombre: "",
      profesor: "",
      año: "",
      faltas: "",
    },
    onSubmit: async (datosIngresados, { resetForm }) => {
      const success = await registrarClase(datosIngresados);
      if (success) {
        resetForm();
      }
    },
    validateOnChange: false,
    // validationSchema: Yup.object({
    //   email: Yup.string().required("Campo obligatorio"),
    //   celular: Yup.number().typeError("Debe ser un número válido"),
    // }),
  });

  const registrarClase = async (data) => {
    try {
      const res = await axios.post("/clases", data);
      console.log(res.data.status);
      if (res.data.status === 200) {
        return Swal.fire({
          icon: "success",
          text: `Clase ${res.data.response.nombre} ${res.data.response.año} ingresada correctamente`,
        });
      } else if (res.data.status === 500) {
        return Swal.fire({
          icon: "error",
          text: "La clase ya existe en la base de datos",
        });
      }
    } catch (error) {
      console.error("Error registrando la clase", error);
      Swal.fire({
        icon: "error",
        text: "Error del servidor",
      });
    }
  };
  return (
    <>
      <AgregarClase formik={formik} />
    </>
  );
};

export default AgregarClaseContainer;
