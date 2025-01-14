import { useEffect, useState } from "react";
import RegistrarAsistencias from "./RegistrarAsistencias";
import axios from "axios";
import { useFormik } from "formik";
import dayjs from "dayjs";
import Swal from "sweetalert2";

//falta capturar varias asistencias a la vez

const RegistrarAsistenciasContainer = () => {
  const [clase, setClase] = useState("");
  const [clasesDisponibles, setClasesDisponibles] = useState([]);
  const [alumnos, setAlumnos] = useState([]);
  const [año, setAño] = useState(2025); //Esto agarrarlo del datePicker
  const [fecha, setFecha] = useState("");
  // const [listaAsistencias, setListaAsistencias] = useState([]); // Array to store assistance records

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

  const handleChangeAño = (date) => {
    if (date) {
      const añoSeleccionado = dayjs(date).year();
      const fechaFormateada = dayjs(date).format("DD/MM/YYYY"); // Format the date as dd/mm/yyyy

      setAño(añoSeleccionado);

      setFecha(fechaFormateada);
      // console.log(fechaFormateada);
    }
  };

  useEffect(() => {
    // console.log(clase, año);
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

  const { handleSubmit, values, setFieldValue, errors } = useFormik({
    initialValues: {
      clase: "",
      fecha: "",
      id_alumno: "",
      asistencia: false,
    },
    onSubmit: (datosIngresados) => {
      datosIngresados.clase = clase;
      datosIngresados.fecha = fecha;
      console.log(datosIngresados);
      registrarAsistencias(datosIngresados);

      // subirListaAsistencias(listaAsistencias)
    },
  });

  const handleSelectStudent = (alumnoId) => {
    setFieldValue("id_alumno", alumnoId);
  };

  const handleSelectAsistencia = (e) => {
    const isChecked = e.target.checked;
    
    return setFieldValue("asistencia", isChecked);
  };

  const registrarAsistencias = (data) => {
    const promise = axios.post("/asistencias", data);

    promise
      .then((res) => {
        if (res.data.status === 200) {
           Swal.fire({
            icon: "success",
            text: "Asistencias registradas con éxito",
          });
          // setListaAsistencias([])
          return
        }
        return Swal.fire({
          icon: "error",
          text: "Error desconocido",
        });
      })

      .catch((err) => console.log("Hubo un error: " + err));
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
        handleSelectAsistencia={handleSelectAsistencia}
        handleSubmit={handleSubmit}
        values={values}
        errors={errors}
      />
    </div>
  );
};

export default RegistrarAsistenciasContainer;
