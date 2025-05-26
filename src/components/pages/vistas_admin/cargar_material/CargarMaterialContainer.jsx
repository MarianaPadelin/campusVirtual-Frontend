import { useEffect, useState } from "react";
import CargarMaterial from "./CargarMaterial";
import axios from "axios";
import { useFormik } from "formik";
import Swal from "sweetalert2";

const CargarMaterialContainer = () => {
  const today = new Date();
  const year = today.getFullYear();
  const [clase, setClase] = useState("");
  const [año, setAño] = useState(year);
  const [fileText, setFileText] = useState("");
  const [clasesDisponibles, setClasesDisponibles] = useState([]);
  const [archivos, setArchivos] = useState([]);
  const [link, setLink] = useState(false)


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

  //Ver todo el material de una clase y un año
  //en descargar archivo solo copiar el url
  useEffect(() => {
    const promise = axios.get(`/material/${clase}/${año}`, {
      withCredentials: true,
    });

    promise
      .then((res) => {
        if (res.data.status === 200) {
          return setArchivos(res.data.result);
        }
        return setArchivos([]);
      })
      // .then(() => console.log(archivos))
      .catch((err) => console.log(err));
  }, [clase, año]);

  const formik = useFormik({
    initialValues: {
      clase: "",
      año: "",
      fecha: "",
      description: "", 
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
      datosIngresados.clase = clase;
      datosIngresados.año = año;
      datosIngresados.fecha = getCurrentDate();
      console.log(datosIngresados);
      
      let promise; 
      if(link === false){
        const formData = new FormData();
        formData.append("clase", datosIngresados.clase);
        formData.append("anio", datosIngresados.año);
        formData.append("description", datosIngresados.description);
        formData.append("fecha", datosIngresados.fecha);
        formData.append("file", datosIngresados.file);
        console.log([...formData]);
         promise = axios.post("/material", formData, {
           headers: { "Content-Type": "multipart/form-data" },
         });
        
      } else{
        console.log("datos:", datosIngresados)
        promise = axios.post("/material/link", {
          clase: datosIngresados.clase,
          anio: datosIngresados.año,
          fecha: datosIngresados.fecha,
          description: datosIngresados.description,
          link: datosIngresados.url,
          title: datosIngresados.title,
        });
      }
     

      promise
        .then((res) => {
          if (res.data.status === 200) {
            Swal.fire({
              icon: "success",
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
          const promise2 = axios.get(`/material/${clase}/${año}`, {
            withCredentials: true,
          });

          promise2.then((res) => {
            if (res.data.status === 200) {
              return setArchivos(res.data.result);
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

  const handleInput = (e) => {
    formik.setFieldValue("file", e.currentTarget.files[0]);
    setFileText("Archivo subido");
  };

  const getCurrentDate = () => {
    const today = new Date();

    // Extract day, month, and year
    const day = String(today.getDate()).padStart(2, "0"); // Ensure 2 digits
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const borrarArchivo = (id) => {
    Swal.fire({
      title: "¿Seguro que desea eliminar el archivo?",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: `Cancelar`,
    })
      .then((result) => {
        if (result.isConfirmed) {
          const promise = axios.delete(`/material/${id}`, {
            withCredentials: true,
          });
          promise.then((res) => {
            if (res.data.status === 200) {
              return Swal.fire({
                icon: "success",
                text: res.data.message,
              });
            }
            return Swal.fire({
              icon: "error",
              text: "Error eliminando el archivo",
            });
          });
        }
      })

      .then(() => {
        const promise = axios.get(`/material/${clase}/${año}`, {
          withCredentials: true,
        });

        promise.then((res) => {
          if (res.data.status === 200) {
            return setArchivos(res.data.result);
          }
          return setArchivos([]);
        });
      })
      .catch((error) =>{ console.log(error)
         Swal.fire({
           text: "Error del servidor",
           icon: "error",
         });
      });
  };
  return (
    <>
      <CargarMaterial
        clase={clase}
        clasesDisponibles={clasesDisponibles}
        handleChangeClases={handleChangeClases}
        handleChangeAño={handleChangeAño}
        handleInput={handleInput}
        fileText={fileText}
        formik={formik}
        año={año}
        archivos={archivos}
        borrarArchivo={borrarArchivo}
        year={year}
        link={link}
        setLink={setLink}
      />
    </>
  );
};

export default CargarMaterialContainer;
