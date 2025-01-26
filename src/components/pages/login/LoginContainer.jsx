import { useFormik } from "formik";
import Login from "./Login";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LoginContainer = () => {
  const [verContraseña, setVerContraseña] = useState(false)
  const navigate = useNavigate();

  const { handleSubmit, handleChange } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (datosIngresados) => {
      iniciarSesion(datosIngresados);
    },
  });

  const iniciarSesion = (data) => {
    const promise = axios.post("/session/login", data);
    promise
      .then((res) => {
        if (res.data.status == 200) {
          Swal.fire({
            icon: "success",
            text: "Usuario conectado",
          })
          // .then(() => mostrarDatosAlumno())
          .then(navigate("/alumnos"));
        }else if (res.data.status == 201) {
          Swal.fire({
            icon: "success",
            text: "Admin conectado",
          }).then(navigate("/admin"));
        } else if (res.data.status == 401) {
          Swal.fire({
            icon: "error",
            text: "Usuario o contraseña incorrectos",
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
   setVerContraseña(!verContraseña)
  }
  return (
    <div>
      <Login handleChange={handleChange} handleSubmit={handleSubmit} handleViewPass={handleViewPass} verContraseña={verContraseña} />
    </div>
  );
};

export default LoginContainer;
