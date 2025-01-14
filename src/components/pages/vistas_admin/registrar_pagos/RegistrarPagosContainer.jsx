import { useEffect, useState } from "react";
import RegistrarPagos from "./RegistrarPagos";
import axios from "axios";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import * as Yup from "yup";

const RegistrarPagosContainer = () => {
  const [alumnos, setAlumnos] = useState([]);
  // const [mes, setMes] = useState("");

  const meses = [
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  useEffect(() => {
    const promise = axios.get(`/alumnos`);
    promise
      .then((res) => setAlumnos(res.data))
      .catch((err) => console.log(err));
  }, []);

  // const handleChangeMes = (e) => {
  //   const mesSeleccionado = e.target.value;
  //   setMes(mesSeleccionado);
  // };
  const { handleSubmit, handleChange, setFieldValue, errors } = useFormik({
    initialValues: {
      id_alumno: "",
      fecha: "",
      monto: 0,
    },
    onSubmit: (datosIngresados) => {
      datosIngresados.fecha = getCurrentDate();
      registrarPagos(datosIngresados);
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      monto: Yup.number().typeError("Debe ser un número válido"),
    }),
  });

  const getCurrentDate = () => {
    const today = new Date();

    // Extract day, month, and year
    const day = String(today.getDate()).padStart(2, "0"); // Ensure 2 digits
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = today.getFullYear();

    return `${day}/${month}/${year}`;
  };

  // Function to handle student selection and set the _id into Formik
  const handleSelectStudent = (alumnoId) => {
    setFieldValue("id_alumno", alumnoId);
  };

  const registrarPagos = (data) => {
    console.log(data);
    const promise = axios.post("/pagos", data);

    promise
      .then((res) => {
        console.log(res.data)
        if (res.data.status === 200) {
          return Swal.fire({
            icon: "success",
            text: "Pago registrado con éxito"});
        }
        return Swal.fire({
          icon: "error",
          text: "Hubo un error cargando el pago",
        });
      })
      .catch((err) => console.log("Hubo un error: " + err));
  };

  return (
    <div>
      <RegistrarPagos
        alumnos={alumnos}
        meses={meses}
        // handleChangeMes={handleChangeMes}
        handleChange={handleChange}
        handleSelectStudent={handleSelectStudent}
        handleSubmit={handleSubmit}
        errors={errors}
      />
    </div>
  );
};

export default RegistrarPagosContainer;
