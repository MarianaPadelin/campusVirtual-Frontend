import { useState } from "react";
import CargarCertificados from "./CargarCertificados";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import axios from "axios";

const CargarCertificadosContainer = () => {
      const [fileText, setFileText] = useState("");
    
  const getCurrentDate = () => {
    const today = new Date();

    // Extract day, month, and year
    const day = String(today.getDate()).padStart(2, "0"); // Ensure 2 digits
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const today = new Date();
  const year = today.getFullYear();

  const handleInput = (e) => {
    formik.setFieldValue("file", e.currentTarget.files[0]);
    setFileText("Archivo subido");
  };

  const formik = useFormik({
    initialValues: {
      nombreAlumno: "",
      apellidoAlumno: "",
      año: "",
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

      const formData = new FormData();
      formData.append("nombreAlumno", datosIngresados.nombreAlumno);
      formData.append("apellidoAlumno", datosIngresados.apellidoAlumno);
      formData.append("anio", year);
      formData.append("fecha", getCurrentDate());
      formData.append("file", datosIngresados.file);
      console.log([...formData]);

      const promise = axios.post("/material/certificado", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      promise
        .then((res) => {
          if (res.data.status === 200) {
            Swal.fire({
              icon: "success",
              text: res.data.message,
              timer: 3000,
            }).then(() => window.location.reload())
            
          } else {
            Swal.fire({
              icon: "error",
              text: res.data.message,
              timer: 1500,
            });
          }
        })
        .catch((error) => console.log(error));
    },
  });

  return (
    <div>
      <CargarCertificados fileText={fileText} handleInput={handleInput} formik={formik}/>
    </div>
  );
};

export default CargarCertificadosContainer;
