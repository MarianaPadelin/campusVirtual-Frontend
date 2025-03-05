import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

//mandarlo por onClick y no por path
//poner un loader
const LogoutContainer = () => {
  const [cerrar, setCerrar] = useState(false);
  const navigate = useNavigate();
  const promise = axios.get("/session/logout");
  promise
    .then((res) => {
      if (res.status == 200) {
        setCerrar(true)
        console.log(cerrar)
       return navigate("/")
      }
      return alert("No se pudo cerrar la sesión");
    })
    .catch((error) =>{ console.log(error)
       Swal.fire({
                  text: "Error del servidor",
                  icon: "error",
                });
    });

  return <></>;
};

export default LogoutContainer;
