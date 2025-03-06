import { useEffect, useState } from "react";
import RegistrarPagos from "./RegistrarPagos";
import axios from "axios";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import * as Yup from "yup";
import Loader from "../../../common/loader/Loader";

const RegistrarPagosContainer = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [montoPorAlumno, setMontoPorAlumno] = useState({}); // Manage monto per alumno
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/alumnos`);
      if(res.data.status === 200){
        return setAlumnos(res.data.alumnos);

      }
      return setAlumnos([])
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          text: "Error del servidor",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  
  const formik = useFormik({
    initialValues: {
      id_alumno: "",
      fecha: "",
      monto: 0,
    },
    onSubmit: async (datosIngresados, { resetForm }) => {
      datosIngresados.fecha = getCurrentDate();
      datosIngresados.monto = montoPorAlumno[datosIngresados.id_alumno] || 0; // Use the specific monto
      if (datosIngresados.monto > 0) {
        const success = await registrarPagos(datosIngresados);
        if (success) {
          resetForm();
          setMontoPorAlumno({}); // Clear the monto values
        }
      } else {
        Swal.fire({
          icon: "error",
          text: "Debe ingresar un valor mayor a cero",
        });
      }
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      monto: Yup.number()
        .typeError("Debe ser un número válido")
        .required("Monto es obligatorio"),
      // .moreThan(0, "Debe tener un valor mayor a cero"),
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

  const registrarPagos = async (data) => {
    try {
      const res = await axios.post("/pagos", data);

      if (res.data.status === 200) {
        Swal.fire({
          icon: "success",
          text: "Pago registrado con éxito",
          timer: 1500,
        });
        return true;
      } else {
        Swal.fire({
          icon: "error",
          text: "Hubo un error cargando el pago",
          timer: 1500,
        });
        return false;
      }
    } catch (error) {
      console.log("Hubo un error: " + error);
      Swal.fire({
        icon: "error",
        text: "Hubo un error en el servidor",
        timer: 1500,
      });
      return false;
    }
  };

  const handleMontoChange = (alumnoId, value) => {
    setMontoPorAlumno((prevState) => ({
      ...prevState,
      [alumnoId]: value,
    }));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <RegistrarPagos
          alumnos={alumnos}
          formik={formik}
          montoPorAlumno={montoPorAlumno}
          handleMontoChange={handleMontoChange}
        />
      )}
    </>
  );
};

export default RegistrarPagosContainer;
