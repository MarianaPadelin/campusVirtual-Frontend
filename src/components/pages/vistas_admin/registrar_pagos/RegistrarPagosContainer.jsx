import { useContext, useEffect, useState } from "react";
import RegistrarPagos from "./RegistrarPagos";
import axios from "axios";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import * as Yup from "yup";
import Forbidden from "../../forbidden/Forbidden";
import { UserContext } from "../../../../context/UserContext";
import Loader from "../../../common/loader/Loader";

const RegistrarPagosContainer = () => {
  const { rolUsuario } = useContext(UserContext);
  const [alumnos, setAlumnos] = useState([]);
  const [montoPorAlumno, setMontoPorAlumno] = useState({}); // Manage monto per alumno

  useEffect(() => {
    const promise = axios.get(`/alumnos`);
    promise
      .then((res) => setAlumnos(res.data))
      .catch((err) => console.log(err));
  }, []);
  // { handleSubmit, handleChange, setFieldValue, errors }
  const formik = useFormik({
    initialValues: {
      id_alumno: "",
      fecha: "",
      monto: 0,
    },
    onSubmit: async (datosIngresados, { resetForm }) => {
      datosIngresados.fecha = getCurrentDate();
      datosIngresados.monto = montoPorAlumno[datosIngresados.id_alumno] || 0; // Use the specific monto

      const success = await registrarPagos(datosIngresados);
      if (success) {
        resetForm();
        setMontoPorAlumno({}); // Clear the monto values
      }
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      monto: Yup.number()
        .typeError("Debe ser un número válido")
        .required("Monto es obligatorio"),
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
        });
        return true;
      } else {
        Swal.fire({
          icon: "error",
          text: "Hubo un error cargando el pago",
        });
        return false;
      }
    } catch (error) {
      console.log("Hubo un error: " + error);
      Swal.fire({
        icon: "error",
        text: "Hubo un error en el servidor",
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
    <div>
      {rolUsuario.length > 0 ? (
        rolUsuario == "admin" ? (
          <RegistrarPagos
            alumnos={alumnos}
            formik={formik}
            montoPorAlumno={montoPorAlumno}
            handleMontoChange={handleMontoChange}
          />
        ) : (
          <Forbidden />
        )
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default RegistrarPagosContainer;
