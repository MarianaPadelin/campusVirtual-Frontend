import axios from "axios";
import RegistrarNotas from "./RegistrarNotas";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";


//está registrando solo la última nota
//agarrar el error cuando no existe una clase para un determinado año
const RegistrarNotasContainer = () => {

  const [clase, setClase] = useState("");
  const [año, setAño] = useState(2025);
  const [alumnos, setAlumnos] = useState([]);
  const [clasesDisponibles, setClasesDisponibles] = useState([]);

  useEffect(() => {
    const promise = axios.get(`/clases`);
    promise
      .then((res) => setClasesDisponibles(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleChangeClases = (e) => {
    const claseSeleccionada = e.target.value;
    setClase(claseSeleccionada);
  };

  const handleChangeAño = (e) => {
    const añoSeleccionado = e.target.value;
    setAño(añoSeleccionado);
  };

  useEffect(() => {
    const promise = axios.get(`/clases/${clase}/${año}`);
    promise
      .then((res) => {
        if (res.data.status == 404) {
          setAlumnos([]);
        }
        setAlumnos(res.data.result);
      })
      .catch((err) => console.log(err));
  }, [clase, año]);

  const { handleSubmit, handleChange, values, setFieldValue, errors } =
    useFormik({
      initialValues: {
        clase: "",
        año: 2025,
        id_alumno: "",
        notaJulio: 0,
        notaDiciembre: 0,
      },
      onSubmit: (datosIngresados) => {
        datosIngresados.clase = clase;
        datosIngresados.año = año;
        console.log(datosIngresados.id_alumno);
        registrarNotas(datosIngresados);
      },
      validateOnChange: false,
      validationSchema: Yup.object({
        notaJulio: Yup.number()
          .typeError("Debe ser un número válido")
          .min(0, "Debe ser un número del 1 al 10")
          .max(10, "Debe ser un número del 1 al 10"),
        notaDiciembre: Yup.number()
          .typeError("Debe ser un número válido")
          .min(0, "Debe ser un número del 1 al 10")
          .max(10, "Debe ser un número del 1 al 10"),
      }),
    });

  // Function to handle student selection and set the _id into Formik
  const handleSelectStudent = (alumnoId) => {
    setFieldValue("id_alumno", alumnoId);
  };

  const registrarNotas = (data) => {
    const promise = axios.post("/notas", data);

    promise
      .then(() => Swal.fire("Notas registradas con éxito"))
      .catch((err) => console.log("Hubo un error: " + err));
  };

  return (
    <>

          <RegistrarNotas
            clasesDisponibles={clasesDisponibles}
            clase={clase}
            año={año}
            alumnos={alumnos}
            handleChange={handleChange}
            handleChangeClases={handleChangeClases}
            handleChangeAño={handleChangeAño}
            handleSelectStudent={handleSelectStudent}
            handleSubmit={handleSubmit}
            values={values}
            errors={errors}
          />
       
    </>
  );
};

export default RegistrarNotasContainer;
