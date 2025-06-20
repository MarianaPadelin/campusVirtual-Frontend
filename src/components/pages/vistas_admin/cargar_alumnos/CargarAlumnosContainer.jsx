import axios from "axios";
import CargarAlumnos from "./CargarAlumnos";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import { useEffect, useState } from "react";

const CargarAlumnosContainer = () => {
  const today = new Date();
  const year = today.getFullYear();
  const [clase, setClase] = useState("");
  const [año, setAño] = useState(year);
  const [alumnos, setAlumnos] = useState([]);
  const [clasesDisponibles, setClasesDisponibles] = useState([]);

  useEffect(() => {
    const promise = axios.get(`/clases`, { withCredentials: true });
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
    const promise = axios.get(`/clases/admin/${clase}/${año}`, {
      withCredentials: true,
    });
    promise
      .then((res) => {
        if (res.data.status == 404) {
          setAlumnos([]);
        }
        setAlumnos(res.data.result);
      })
      .catch((err) => console.log(err));
  }, [clase, año]);

  const { handleSubmit, handleChange, values, setFieldValue } = useFormik({
    initialValues: {
      nombreClase: "",
      año: "",
      nombre: "",
      apellido: "",
    },
    onSubmit: async (datosIngresados) => {
      Swal.fire({
        imageUrl:
          "https://res.cloudinary.com/dvxkjikvk/image/upload/v1738096102/campus/ZKZg_fvg2mn.gif",
        imageWidth: 100,
        imageHeight: 100,
        imageAlt: "Cargando",
        text: "Cargando...",
        showConfirmButton: false,
      });
      try {
        datosIngresados.nombreClase = clase;
        datosIngresados.año = año;
        agregarAlumnosLista(datosIngresados);
        setFieldValue("apellido", "");
        // .toLowerCase()
        // .trim()
        // .replace(/^\w/, (c) => c.toUpperCase());
        setFieldValue("nombre", "");
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          text: error,
        });
      }
    },
  });

  const agregarAlumnosLista = (datos) => {
    const promise = axios.post(`/clases/add`, datos, { withCredentials: true });

    promise
      .then((res) => {
        if (res.data.status == 200) {
          return Swal.fire({
            icon: "success",
            text: `Alumno añadido a la lista de ${clase}`,
            timer: 1500,
          }).then(() => {
            axios
              .get(`/clases/admin/${clase}/${año}`, { withCredentials: true })
              .then((res) => setAlumnos(res.data.result))
              .catch((err) => console.log(err));
          });
        } else {
          return Swal.fire({
            icon: "error",
            text: res.data.message,
            timer: 1500,
          });
        }
      })

      .catch((err) => console.log("Hubo un error: " + err));
  };

  const borrarAlumnoLista = (id) => {
    Swal.fire({
      title: `¿Desea eliminar al alumno de la clase ${clase} ${año}?`,
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: `Cancelar`,
    })
      .then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          const promise = axios.delete(`/clases/${clase}/${año}/${id}`, {
            withCredentials: true,
          });

          promise
            .then(() =>
              Swal.fire({
                icon: "success",
                text: "Alumno eliminado",
              })
            )
            .then(() => {
              axios
                .get(`/clases/admin/${clase}/${año}`, { withCredentials: true })
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
        year={year}
      />
    </>
  );
};

export default CargarAlumnosContainer;
