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
  const [link, setLink] = useState(false);

  useEffect(() => {
    const promise = axios.get(`/clases/alumno/${id}/${año}`, {
      withCredentials: true,
    });
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
    const controller = new AbortController();
    //no borrar este log, hace que se refresque la clase seleccionada
    console.log(clase);
    const fetchData = async () => {
      try {
        const res = await axios.get(`/tp/alumno/${id}/${clase}`, {
          withCredentials: true,
          signal: controller.signal,
        });

        if (res.data.status === 200) {
          setArchivos(res.data.tps);
        } else {
          setArchivos([]);
        }
      } catch (error) {
        if (error.name === "CanceledError") {
          console.log("Request cancelled");
        } else {
          console.error("Error fetching data:", error);
          setArchivos([]);
        }
      }
    };

    fetchData();

    // Cleanup function to cancel previous request
    return () => {
      controller.abort();
    };
  }, [clase, id]);

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
      año: "",
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
      datosIngresados.año = año;
      datosIngresados.clase = clase;
      let promise;
      if (link === false) {
        const formData = new FormData();
        formData.append("idAlumno", id);
        formData.append("clase", clase);
        formData.append("anio", datosIngresados.año);

        formData.append("fecha", datosIngresados.fecha);
        formData.append("file", datosIngresados.file);
        console.log([...formData]);

        promise = axios.post(
          "/tp",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
          { withCredentials: true }
        );
      } else {
        promise = axios.post(
          "/tp/link",
          {
            idAlumno: id,
            clase: datosIngresados.clase,
            anio: datosIngresados.año,
            fecha: datosIngresados.fecha,
            link: datosIngresados.url,
            title: datosIngresados.title,
          },
          { withCredentials: true }
        );
      }

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
          const promise = axios.get(`/tp/alumno/${id}/${clase}`, {
            withCredentials: true,
          });

          promise.then((res) => {
            console.log(res);
            if (res.data.status === 200) {
              return setArchivos(res.data.tps);
            }
            return setArchivos([]);
          });
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            text: "Error del servidor",
            icon: "error",
          });
        });
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
          console.log(idTP);
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
              const promise = axios.get(`/tp/alumno/${id}/${clase}`, {
                withCredentials: true,
              });

              promise.then((res) => {
                if (res.data.status === 200) {
                  return setArchivos(res.data.tps);
                }
                return setArchivos([]);
              });
            })
            .catch((error) => console.log(error));
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          text: "Error del servidor",
          icon: "error",
        });
      });
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
        link={link}
        setLink={setLink}
      />
    </>
  );
};

export default TpContainer;
