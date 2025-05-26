import { useEffect } from "react";
import TpAlumno from "./TpAlumno";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import Loader from "../../../common/loader/Loader";

const TpAlumnoContainer = () => {
  const [tpList, setTpList] = useState([]);
  const { id, clase, year } = useParams();
  const [alumno, setAlumno] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/alumnos/getById/${id}`, {
          withCredentials: true,
        });
        setAlumno(
          `${res.data.alumno.nombre}` + " " + `${res.data.alumno.apellido}`
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  });

  useEffect(() => {
    const promise = axios.get(`/tp/admin/${id}/${clase}/${year}`, {
      withCredentials: true,
    });
    promise
      .then((res) => {
        if (res.data.status === 200) {
          return setTpList(res.data.tps);
        }
        return setTpList([]);
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          text: "Error del servidor",
          icon: "error",
        });
      });
  }, []);

  const { handleSubmit, handleChange, setFieldValue, errors } = useFormik({
    initialValues: {
      id: "",
      nota: 0,
      devolucion: "",
    },
    onSubmit: async (data, { resetForm }) => {
      Swal.fire({
        title: "¿Enviar nota?",
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          asignarNotas(data);
          resetForm();
        }
      });
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      notaTP: Yup.number()
        .nullable()
        .typeError("Debe ser un número válido")
        .min(0, "Debe ser un número del 1 al 10")
        .max(10, "Debe ser un número del 1 al 10"),
    }),
  });

  const handleTpId = (id) => {
    setFieldValue("id", id);
  };

  const asignarNotas = async (data) => {
    try {
      const res = await axios.post(`/tp/sendNota/${data.id}`, data, {
        withCredentials: true,
      });
      if (res.data.status === 200) {
        Swal.fire({
          icon: "success",
          text: "Nota registradas con éxito",
          timer: 1500,
        });
        const res = await axios.get(`/tp/admin/${id}/${clase}/${year}`, {
          withCredentials: true,
        });
        return setTpList(res.data.tps);
      }

      return Swal.fire({
        icon: "error",
        text: "Error registrando la nota",
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
      return Swal.fire({
        icon: "error",
        text: "Error registrando la notas",
        timer: 1500,
      });
    }
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <TpAlumno
          tpList={tpList}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleTpId={handleTpId}
          errors={errors}
          alumno={alumno}
          clase={clase}
          year={year}
        />
      )}
    </>
  );
};

export default TpAlumnoContainer;
