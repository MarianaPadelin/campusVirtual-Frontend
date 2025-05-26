import { useParams } from "react-router-dom";
import Info from "./Info";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../../common/loader/Loader";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

const InfoContainer = () => {
  const [alumno, setAlumno] = useState({});
  const [showForm, setShowForm] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const promise = axios.get(`/alumnos/getById/${id}`, { withCredentials: true });
    promise
      .then((res) => setAlumno(res.data.alumno))
      .catch((err) => console.log("Hubo un error: " + err));
  }, [id]);

  const handleClick = () => {
    setShowForm(!showForm);
  };

  
  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      nombre: alumno.nombre || "",
      apellido: alumno.apellido || "",
      email: alumno.email || "",
      celular: alumno.celular || "",
    },
    enableReinitialize: true,
    onSubmit: (datosIngresados) => {
      modificarAlumno(datosIngresados);
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      email: Yup.string().required("Campo obligatorio"),
      celular: Yup.number().typeError("Debe ser un número válido"),
    }),
  });

  const modificarAlumno = (data) => {
    const promise = axios.put(`alumnos/${alumno._id}`, data, {
      withCredentials: true,
    });

    promise
      .then((res) => {
        if (res.data.status == 200) {
          return Swal.fire({
            icon: "success",
            text: `Alumno modificado con éxito`,
            timer: 1500,
          });
        }
        return Swal.fire({
          icon: "error",
          text: "Ocurrió un error",
          timer: 1500,
        });
      })
      .then(() => {
        axios
          .get(`/alumnos/${id}`, { withCredentials: true })
          .then((res) => setAlumno(res.data.alumno[0]))
          .catch((err) => console.log("Hubo un error: " + err));
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {alumno._id ? (
        <Info
          alumnoEncontrado={alumno}
          handleClick={handleClick}
          showForm={showForm}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          errors={errors}
          values={values}
        />
      ) : (
        <Loader />
      )}
    </>
  );
};

export default InfoContainer;
