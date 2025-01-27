import ResetPassword from "./ResetPassword"
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";

//falta mandar mail con link para llegar acá 
const ResetPasswordContainer = () => {
    const [verContraseña, setVerContraseña] = useState(false)
     const navigate = useNavigate();
     const { handleSubmit, handleChange, errors } = useFormik({
       initialValues: {
         email: "",
         password: "",
       },
       onSubmit: (datosIngresados) => {
         resetPassword(datosIngresados);
       },
       validateOnChange: false,
       validationSchema: Yup.object({
         email: Yup.string()
           .email("Debe ser una dirección de email válida")
           .required("Campo obligatorio"),

         password: Yup.string()
           .min(8, "Debe tener al menos 8 caracteres")
           .required("Campo obligatorio"),
         repeatPassword: Yup.string().oneOf(
           [Yup.ref("password"), null],
           "Debe coincidir con el campo anterior"
         ),
       }),
       //poner la validación de email y contraseña
     });

     const resetPassword = (data) => {
       const promise = axios.put("/session/resetPassword", data, {
         withCredentials: true,
       });

       promise
         .then((res) => {
           if (res.data.status == 200) {
             Swal.fire({
               icon: "success",
               text: "Contraseña actualizada",
             }).then(navigate("/"));
           } else if (res.data.status == 400) {
             Swal.fire({
               icon: "error",
               text: "El usuario no existe",
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
      <ResetPassword
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        errors={errors}
        handleViewPass={handleViewPass}
        verContraseña={verContraseña}
      />
    </div>
  );
}

export default ResetPasswordContainer