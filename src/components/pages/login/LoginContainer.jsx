import { useFormik } from "formik";
import Login from "./Login";
// import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../../context/UserContext";

const LoginContainer = () => {
  const [verContraseña, setVerContraseña] = useState(false);
  const navigate = useNavigate();
  const { loginUser } = useContext(UserContext);

  const { handleSubmit, handleChange } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (datosIngresados) => {
      Swal.fire({
        imageUrl:
          "https://res.cloudinary.com/dvxkjikvk/image/upload/v1738096102/campus/ZKZg_fvg2mn.gif",
        imageWidth: 100,
        imageHeight: 100,
        imageAlt: "Cargando",
        text: "Conectando...",
        showConfirmButton: false,
      });
      try {
        const response = await loginUser(datosIngresados);
        console.log(response);
        if (response.success) {
          return Swal.fire({
            icon: "success",
            text: response.message,
            timer: 1500,
          }).then(() => {
            navigate(response.role === "admin" ? "/admin" : "/alumnos");
          });
        } else {
          Swal.fire({
            icon: "error",
            text: response.message,
            timer: 1500,
          });
        }
      } catch (error) {
        console.log(error);
        Swal.fire({
          text: "Error del servidor",
          icon: "error",
        });
      }
    },
  });

  const handleViewPass = () => {
    setVerContraseña(!verContraseña);
  };
  return (
    <div>
      <Login
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleViewPass={handleViewPass}
        verContraseña={verContraseña}
      />
    </div>
  );
};

export default LoginContainer;
