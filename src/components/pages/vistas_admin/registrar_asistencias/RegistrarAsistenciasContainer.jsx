import { useEffect, useState } from "react";
import RegistrarAsistencias from "./RegistrarAsistencias";
import axios from "axios";
import { useFormik } from "formik";

const RegistrarAsistenciasContainer = () => {
  const [clase, setClase] = useState("");
  const [clasesDisponibles, setClasesDisponibles] = useState([]);
  const [alumnos, setAlumnos] = useState([]);
  const [año, setAño] = useState(2025); //Esto agarrarlo del datePicker

  //fecha/setFecha

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
    console.log("año seleccionado: ", e.target.value);
    const añoSeleccionado = e.target.value;
    setAño(añoSeleccionado);
  };

  useEffect(() => {
    console.log(clase, año);
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

  const { handleSubmit, values, setFieldValue, errors } =
    useFormik({
      initialValues: {
        clase: "",
        fecha: "", 
        id_alumno: "",
        asistencia: false,
      },
      onSubmit: (datosIngresados) => {
        datosIngresados.clase = clase;
        console.log(datosIngresados);
      },
    });

  const handleSelectStudent = (alumnoId) => {
    setFieldValue("id_alumno", alumnoId);
    setFieldValue("asistencia", true)
  };
  return (
    <div>
      <RegistrarAsistencias
        clase={clase}
        año={año}
        clasesDisponibles={clasesDisponibles}
        alumnos={alumnos}
        handleChangeClases={handleChangeClases}
        handleChangeAño={handleChangeAño}
        // handleChange={handleChange}
        handleSelectStudent={handleSelectStudent}
        handleSubmit={handleSubmit}
        values={values}
        errors={errors}
      />
    </div>
  );
};

export default RegistrarAsistenciasContainer;
