import { useFormik } from "formik";
import Login from "./Login";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const LoginContainer = () => {
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
          }).then(navigate("/alumnos"));
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
  return (
    <div>
      <Login handleChange={handleChange} handleSubmit={handleSubmit} />{" "}
    </div>
  );
};

export default LoginContainer;
