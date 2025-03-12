import axios from "axios";
import RegistrarNotas from "./RegistrarNotas";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import Loader from "../../../common/loader/Loader";

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
  const [loading, setLoading] = useState(true);

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
    const fetchData = async () => {
      try {
        const res = await axios.get(`/clases/admin/${clase}/${año}`);

        if (res.data.status == 404) {
          return setAlumnos([]);
        }

        return setAlumnos(res.data.result);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [clase, año]);

  //para cada alumno de esa clase buscar si tiene notas, si es asi renderizarlas, sino mostrar el formulario

  const { handleSubmit, handleChange, values, setFieldValue, errors } =
    useFormik({
      initialValues: {
        clase: "",
        año: 2025,
        id_alumno: "",
        notaJulio: null,
        notaDiciembre: null,
      },
      onSubmit: async (datosIngresados, { resetForm }) => {
        datosIngresados.clase = clase;
        datosIngresados.año = año;

        // Me aseguro de limpiar los campos si no pongo nada
        if (datosIngresados.notaJulio === null)
          delete datosIngresados.notaJulio;
        if (datosIngresados.notaDiciembre === null)
          delete datosIngresados.notaDiciembre;
        await registrarNotas(datosIngresados);
         resetForm();
      },

      validateOnChange: false,
      validationSchema: Yup.object({
        notaJulio: Yup.number()
          .nullable()
          .typeError("Debe ser un número válido")
          .min(0, "Debe ser un número del 1 al 10")
          .max(10, "Debe ser un número del 1 al 10"),
        notaDiciembre: Yup.number()
          .nullable()
          .typeError("Debe ser un número válido")
          .min(0, "Debe ser un número del 1 al 10")
          .max(10, "Debe ser un número del 1 al 10"),
      }),
    });

  // Function to handle student selection and set the _id into Formik
  const handleSelectStudent = (alumnoId) => {
    setFieldValue("id_alumno", alumnoId);
  };

  const registrarNotas = async (data) => {
    try {
      const res = await axios.post("/notas", data);

      if (res.data.status === 200) {
        Swal.fire({
          icon: "success",
          text: "Notas registradas con éxito",
          timer: 1500,
        });
        const res = await axios.get(`/clases/admin/${clase}/${año}`);

        return setAlumnos(res.data.result);
      }

      return Swal.fire({
        icon: "error",
        text: "Error registrando las notas",
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
      return Swal.fire({
        icon: "error",
        text: "Error registrando las notas",
        timer: 1500,
      });
    }
  };

  const borrarNotas = async (id, id_alumno) => {
    try {
      const result = await Swal.fire({
        title: "¿Eliminar nota?",
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: `Cancelar`,
      });
      if (result.isConfirmed) {
        const res = await axios.delete(`/notas/${id}/${id_alumno}`, {
          withCredentials: true,
        });

        if (res.data.status === 200) {
          Swal.fire({
            icon: "success",
            text: "Nota eliminada",
            timer: 1500,
          });
          const res2 = await axios.get(`/clases/admin/${clase}/${año}`);

          return setAlumnos(res2.data.result);
        } Swal.fire({
          icon: "error",
          text: "Error eliminando la nota"
        })
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        text: "Error del servidor ",
      });
    }
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
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
          borrarNotas={borrarNotas}
        />
      )}
    </>
  );
};

export default RegistrarNotasContainer;
