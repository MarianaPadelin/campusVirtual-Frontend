import { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";

import Tp from "./Tp";
import Swal from "sweetalert2";
import { UserContext } from "../../../../context/UserContext";
import axios from "axios";

const TpContainer = () => {
  const { id } = useContext(UserContext);
  const [clasesDisponibles, setClasesDisponibles] = useState([]);
  const [clase, setClase] = useState("");
  const [fileText, setFileText] = useState("");
  const [archivos, setArchivos] = useState([]);
  const today = new Date();
  const año = today.getFullYear();

  console.log(id)
  useEffect(() => {
    const promise = axios.get(`/clases/alumno/${id}/${año}`);
    promise
      .then((res) => {
        if (res.data.status === 200) {
          return setClasesDisponibles(res.data.nombreClases);
        }
        return setClasesDisponibles([]);
      })
      .catch((err) => console.log(err));
  }, [id]);


  useEffect(() => {
    const promise = axios.get(`/tp/${id}`)
    promise.then((res) => {
      if(res.data.status === 200){
        return setArchivos(res.data.tps)
      }
      return setArchivos([])
    })
  }, [id])
  const handleChangeClases = (e) => {
    const claseSeleccionada = e.target.value;
    setClase(claseSeleccionada);
  };
  const formik = useFormik({
    initialValues: {
      idAlumno: "",
      clase: "",
      fecha: "",
      file: null,
    },
    onSubmit: (datosIngresados) => {
      Swal.fire({
        imageUrl:
          "https://res.cloudinary.com/dvxkjikvk/image/upload/v1738096102/campus/ZKZg_fvg2mn.gif",
        imageWidth: 100,
        imageHeight: 100,
        imageAlt: "Cargando",
        text: "Subiendo material...",
        showConfirmButton: false,
      });
      datosIngresados.fecha = getCurrentDate();
      console.log(datosIngresados.fecha);
      const formData = new FormData();
      formData.append("idAlumno", id);
      formData.append("clase", clase);
      formData.append("fecha", datosIngresados.fecha);
      formData.append("file", datosIngresados.file);
      console.log([...formData]);

      const promise = axios.post("/tp", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      promise
        .then((res) => {
          if (res.data.status === 200) {
            Swal.fire({
              icon: "success",
              text: res.data.message,
              timer: 1500,
            });
          } else if (res.data.status === 404) {
            Swal.fire({
              icon: "error",
              text: res.data.message,
              timer: 1500,
            });
          } else {
            Swal.fire({
              icon: "error",
              text: res.data.message,
              timer: 1500,
            });
          }
        })
        .then(() => {
          const promise = axios.get(`/tp/${id}`, {
            withCredentials: true,
          });

          promise.then((res) => {
            console.log(res)
            if (res.data.status === 200) {
              return setArchivos(res.data.tps);
            }
            return setArchivos([]);
          });
        })
        .catch((error) => console.log(error));
    },
  });

  const getCurrentDate = () => {
    const today = new Date();

    // Extract day, month, and year
    const day = String(today.getDate()).padStart(2, "0"); // Ensure 2 digits
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const handleInput = (e) => {
    formik.setFieldValue("file", e.currentTarget.files[0]);
    setFileText("Archivo subido");
  };

  const borrarArchivo = (idTP) => {
    Swal.fire({
      title: "¿Seguro que desea eliminar el archivo?",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: `Cancelar`,
    })
      .then((result) => {
        if (result.isConfirmed) {
          console.log(idTP)
          const promise = axios.delete(`/tp/${idTP}`, {
            withCredentials: true,
          });
          promise
            .then((res) => {
              if (res.data.status === 200) {
                return Swal.fire({
                  icon: "success",
                  text: res.data.message,
                });
              }
              return Swal.fire({
                icon: "error",
                text: res.data.message,
              });
            })
            .then(() => {
              const promise = axios.get(`/tp/${id}`, {
                withCredentials: true,
              });

              promise.then((res) => {
                if (res.data.status === 200) {
                  return setArchivos(res.data.tps);
                }
                return setArchivos([]);
              });
            })
            .catch((error) => console.log(error));;
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      <Tp
        clasesDisponibles={clasesDisponibles}
        clase={clase}
        handleChangeClases={handleChangeClases}
        handleInput={handleInput}
        fileText={fileText}
        formik={formik}
        archivos={archivos}
        borrarArchivo={borrarArchivo}
      />
    </>
  );
};

export default TpContainer;
