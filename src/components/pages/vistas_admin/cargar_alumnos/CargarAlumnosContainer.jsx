import axios from "axios";
import CargarAlumnos from "./CargarAlumnos";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import { useEffect, useState } from "react";

const CargarAlumnosContainer = () => {
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

  const agregarAlumnosLista = (datos) => {
    const promise = axios.get(`/clases/add/${clase}/${año}`, { params: datos });

    promise
      .then((res) => {
        if (res.data.status == 404) {
          return Swal.fire({
            icon: "error",
            text: "El alumno no se encuentra en la base de datos",
          });
        } else if (res.data.status == 200) {
          return Swal.fire({
            icon: "success",
            text: `Alumno añadido a la lista de ${clase}`,
          });
        } else if (res.data.status == 500) {
          return Swal.fire({
            icon: "error",
            text: "El alumno ya está anotado en esta clase",
          });
        } else {
          return Swal.fire({
            icon: "error",
            text: "Error desconocido",
          });
        }
      })
      .then(() => {
        axios
          .get(`/clases/${clase}/${año}`)
          .then((res) => setAlumnos(res.data.result))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log("Hubo un error: " + err));
  };

  const { handleSubmit, handleChange, values, setFieldValue } = useFormik({
    initialValues: {
      apellido: "",
    },
    onSubmit: (datosIngresados) => {
      agregarAlumnosLista(datosIngresados);
      setFieldValue("apellido", "");
    },
  });

  const borrarAlumnoLista = (id) => {
    Swal.fire({
      title:
        `¿Desea eliminar al alumno de la clase ${clase} ${año}?` ,
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: `Cancelar`,
    })
      .then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          const promise = axios.delete(`/clases/${clase}/${año}/${id}`);

          promise
            .then(() =>
              Swal.fire({
                icon: "success",
                text: "Alumno eliminado",
              })
            )
            .then(() => {
              axios
                .get(`/clases/${clase}/${año}`)
                .then((res) => setAlumnos(res.data.result))
                .catch((err) => console.log(err));
            })
            .catch((err) =>
              console.log(
                "Hubo un error: " + err + ". El id recibido es: " + id
              )
            );
        }
      })
      .catch((err) => console.log("Hubo un error: ", err));
  };

  return (
    <>
      <CargarAlumnos
        agregarAlumnosLista={agregarAlumnosLista}
        clasesDisponibles={clasesDisponibles}
        clase={clase}
        handleChangeClases={handleChangeClases}
        año={año}
        alumnos={alumnos}
        handleChangeAño={handleChangeAño}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        values={values}
        borrarAlumnoLista={borrarAlumnoLista}
      />
    </>
  );
};

export default CargarAlumnosContainer;
