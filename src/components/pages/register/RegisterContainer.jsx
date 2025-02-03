import Register from "./Register";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";

const RegisterContainer = () => {
    const [verContraseña, setVerContraseña] = useState(false)
  
  const navigate = useNavigate();
  const { handleSubmit, handleChange, errors } = useFormik({
    initialValues: {
      email: "",
      password: "",
      repeatPassword: "", 
    },
    onSubmit: (datosIngresados) => {
       Swal.fire({
              imageUrl:
                "https://res.cloudinary.com/dvxkjikvk/image/upload/v1738096102/campus/ZKZg_fvg2mn.gif",
              imageWidth: 100,
              imageHeight: 100,
              imageAlt: "Cargando",
              text: "Conectando...",
              showConfirmButton: false,
            });
      registrarse(datosIngresados);
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Debe ser una dirección de email válida")
        .required("Campo obligatorio"),

      password: Yup.string()
        .min(8, "Debe tener al menos 8 caracteres")
        .required("Campo obligatorio"),
      repeatPassword: Yup.string().required("Campo obligatorio").oneOf(
        [Yup.ref("password"), null],
        "Debe coincidir con el campo anterior"
      ),
    }),
    //poner la validación de email y contraseña
  });

  const registrarse =  (data) => {
    const promise = axios.post("/session/register", data, {
      withCredentials: true,
    });

    promise
      .then((res) => {
        if (res.data.status == 200) {
          Swal.fire({
            icon: "success",
            text: "Usuario registrado",
          }).then(navigate("/"));
        } else if (res.data.status == 400) {
          Swal.fire({
            icon: "error",
            text: "El usuario ya está registrado",
          });
        } else if (res.data.status == 500) {
          Swal.fire({
            icon: "error",
            text: "Este email no está registrado como alumno de la escuela, por favor contactarse con recepción",
          });
        } else {
          Swal.fire({
            icon: "error",
            text: "Error desconocido",
          });
        }
      })
      .catch((err) => console.log(err));
  };
const handleViewPass = () => {
  setVerContraseña(!verContraseña);
};
  return (
    <div>
      <Register
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        errors={errors}
        handleViewPass={handleViewPass}
        verContraseña={verContraseña}
      />
    </div>
  );
};

export default RegisterContainer;
