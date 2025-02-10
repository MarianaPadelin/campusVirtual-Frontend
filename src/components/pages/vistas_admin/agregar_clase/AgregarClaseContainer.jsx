import AgregarClase from "./AgregarClase";
import { useFormik } from "formik";
// import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import * as Yup from "yup";

const AgregarClaseContainer = () => {
  const today = new Date();
  const year = today.getFullYear();
  const [datosClase, setDatosClase] = useState([]);
  const [año, setAño] = useState(year);
  const [showForm, setShowForm] = useState(false);
  const [clase, setClase] = useState({});

  const handleChangeAño = (e) => {
    const añoSeleccionado = e.target.value;
    setAño(añoSeleccionado);
  };
  const formik = useFormik({
    //3 parámetros: los valores iniciales, la función con onsubmit, y las validaciones
    initialValues: {
      nombre: clase.nombre || "",
      profesor: clase.profesor || "",
      año: clase.año || "",
      faltas: clase.faltas || "",
    },
    enableReinitialize: true,

    onSubmit: async (datosIngresados, { resetForm }) => {
      const success = await registrarClase(datosIngresados);
      if (success) {
        resetForm();
      }
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      nombre: Yup.string().required("Campo obligatorio"),
      año: Yup.string().required("Campo obligatorio"),
      faltas: Yup.string().required("Campo obligatorio"),
    }),
  });

  const registrarClase = async (data) => {
    try {
      const res = await axios.post("/clases", data);
      if (res.data.status === 200) {
        setShowForm(false);
        setClase({});
        return Swal.fire({
          icon: "success",
          text: `Clase ${res.data.response.nombre} ${res.data.response.año} ingresada correctamente`,
          timer: 1500,
        });
      } else if (res.data.status === 201) {
        setShowForm(false);
        setClase({});
        return Swal.fire({
          icon: "success",
          text: `Clase modificada correctamente`,
          timer: 1500,
        });
      } else if (res.data.status === 500) {
        return Swal.fire({
          icon: "error",
          text: "La clase ya existe en la base de datos",
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error registrando la clase", error);
      Swal.fire({
        icon: "error",
        text: "Error del servidor",
        timer: 1500,
      });
    }
  };

  useEffect(() => {
    const promise = axios.get(`/clases/year/${año}`, { withCredentials: true });
    promise
      .then((res) => setDatosClase(res.data.listaClases))
      .catch((error) => console.log(error));
  }, [año]);

  const handleClick = (data) => {
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    return setClase(data);
  };

  const salir = () => {
    setShowForm(false);
    return setClase({});
  };
  const borrarClase = (id) => {
    Swal.fire({
      title:
        "¿Seguro que desea eliminar la clase? Perderá la información de notas, asistencias y alumnos anotados.",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const promise = axios.delete(`/clases/clase/${id}`, {
          withCredentials: true,
        });
        promise.then((res) => {
          if (res.data.status === 200) {
            return Swal.fire({
              icon: "success",
              text: res.data.message,
            }).then(() => {
              const promise = axios.get(`/clases/year/${año}`);

              promise
                .then((res) => {
                  return setDatosClase(res.data.listaClases);
                })
                .catch((error) => console.log(error));
            });
          }
          return Swal.fire({
            icon: "error",
            text: res.data.message,
          });
        });
      }
    });
  };

  return (
    <>
      <AgregarClase
        año={año}
        handleChangeAño={handleChangeAño}
        formik={formik}
        datosClase={datosClase}
        borrarClase={borrarClase}
        handleClick={handleClick}
        showForm={showForm}
        setShowForm={setShowForm}
        salir={salir}
      />
    </>
  );
};

export default AgregarClaseContainer;
