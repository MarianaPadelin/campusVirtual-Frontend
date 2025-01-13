import { useEffect, useState } from "react";
import RegistrarPagos from "./RegistrarPagos";
import axios from "axios";
import { useFormik } from "formik";
import Swal from "sweetalert2";

const RegistrarPagosContainer = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [mes, setMes] = useState("")

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

  const handleChangeMes = (e) => {
    const mesSeleccionado = e.target.value;
    setMes(mesSeleccionado);
  };
    const { handleSubmit, handleChange, setFieldValue } = useFormik({
      initialValues: {
        mes: "", 
        id_alumno: "",
        monto: "",
      },
      onSubmit: (datosIngresados) => {
        datosIngresados.mes = mes
        registrarPagos(datosIngresados)
      },
      // falta validación de que sea un numero del 1 al 10
    });
  
    // Function to handle student selection and set the _id into Formik
    const handleSelectStudent = (alumnoId) => {
      setFieldValue("id_alumno", alumnoId);
    };


    const registrarPagos = (data) => {
      console.log(data)
      const promise = axios.post("/pagos", data)
      
      promise
        .then(() => Swal.fire("Pago registrado con éxito"))
        .catch((err) => console.log("Hubo un error: " + err));

    }

  return (
    <div>
      <RegistrarPagos
        alumnos={alumnos}
        meses={meses}
        handleChangeMes={handleChangeMes}
        handleChange={handleChange}
        handleSelectStudent={handleSelectStudent}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default RegistrarPagosContainer;
