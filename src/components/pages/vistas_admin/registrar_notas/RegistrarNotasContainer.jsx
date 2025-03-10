import axios from "axios";
import RegistrarNotas from "./RegistrarNotas";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

//está registrando solo la última nota
//agarrar el error cuando no existe una clase para un determinado año
const RegistrarNotasContainer = () => {
  const today = new Date();
  const year = today.getFullYear();
  const [clase, setClase] = useState("");
  const [año, setAño] = useState(year);
  const [alumnos, setAlumnos] = useState([]);
  const [clasesDisponibles, setClasesDisponibles] = useState([]);
  // const [notas, setNotas] = useState([]);

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
    const promise = axios.get(`/clases/admin/${clase}/${año}`);
    promise
      .then((res) => {
        if (res.data.status == 404) {
         return setAlumnos([]);
        }
        console.log(res.data)
        // const notas = res.data.result[0].notas.filter((nota) => nota.clase === clase )
        // console.log(notas)
       return setAlumnos(res.data.result);
      })
      .catch((err) => console.log(err));
  }, [clase, año]);

  //para cada alumno de esa clase buscar si tiene notas, si es asi renderizarlas, sino mostrar el formulario

  const { handleSubmit, handleChange, values, setFieldValue, errors } =
    useFormik({
      initialValues: {
        clase: "",
        año: 2025,
        id_alumno: "",
        notaJulio: 0,
        notaDiciembre: 0,
      },
      onSubmit: async (datosIngresados, { resetForm }) => {
        datosIngresados.clase = clase;
        datosIngresados.año = año;
        const success = await registrarNotas(datosIngresados);
        if (success) {
          resetForm();
        }
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
      .then((res) => {
        if (res.data.status === 200) {
          return Swal.fire({
            icon: "success",
            text: "Notas registradas con éxito",
            timer: 1500,
          });
        }
        return Swal.fire({
          icon: "error",
          text: "Error registrando las notas",
          timer: 1500,
        });
      })
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
        year={year}
      />
    </>
  );
};

export default RegistrarNotasContainer;
