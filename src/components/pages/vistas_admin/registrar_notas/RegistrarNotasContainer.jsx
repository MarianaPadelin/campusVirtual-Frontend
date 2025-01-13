import axios from "axios";
import RegistrarNotas from "./RegistrarNotas";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import { useEffect, useState } from "react";

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
      // .then((res) => console.log(res.data))
      .then((res) => setAlumnos(res.data))
      .catch((err) => console.log(err));
  }, [clase, año]);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //           console.log(e);

  //   const valores = {
  //         clase,
  //         id_alumno: "677c5007899ac18cdb7cfcc0",

  //       }
  //       console.log(valores);
  // }

  // ---con formik---
  const { handleSubmit, handleChange, values, setFieldValue } = useFormik({
    initialValues: {
      clase: "",
      id_alumno: "",
      notaJulio: "",
      notaDiciembre: "",
    },
    onSubmit: (datosIngresados) => {
      datosIngresados.clase = clase;
      // datosIngresados.id_alumno = value;
      console.log(datosIngresados.id_alumno);
      registrarNotas(datosIngresados);
      // setFieldValue("notaJulio", "");
      // setFieldValue("notaDiciembre", "");
    },
    // falta validación de que sea un numero del 1 al 10
  });

  // Function to handle student selection and set the _id into Formik
  const handleSelectStudent = (alumnoId) => {
    setFieldValue("id_alumno", alumnoId);
  };

  const registrarNotas = (data) => {
    console.log(data);
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
      />
    </>
  );
};

export default RegistrarNotasContainer;
