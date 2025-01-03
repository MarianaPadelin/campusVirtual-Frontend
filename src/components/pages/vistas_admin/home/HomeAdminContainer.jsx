import { useEffect, useState } from "react";
import HomeAdmin from "./HomeAdmin";
import axios from "axios";
import Swal from "sweetalert2";

//ordenar por apellido

const HomeAdminContainer = () => {
  const [alumnos, setAlumnos] = useState([]);

  // axios.defaults.withCredentials = true;
  useEffect(() => {
    const promise = axios.get(`/alumnos`);
    promise
      .then((res) => setAlumnos(res.data))
      .catch((err) => console.log(err));
  }, []);

  const eliminarElemento = (id) => {
    const promise = axios.delete(`/alumnos/${id}`);

    promise
      .then(() =>
        Swal.fire({
          title: "¿Eliminar alumno?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Sí",
          denyButtonText: `No`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            Swal.fire(`Alumno ${id} eliminado`);
          }
          // else if (result.isDenied) {
          //   Swal.fire("Changes are not saved", "", "info");
          // }
        })
      )
      //  .then(() => console.log(alumno))
      .catch((err) =>
        console.log("Hubo un error: " + err + ". El id recibido es: " + id)
      );
  };
  return (
    <>
      <HomeAdmin alumnos={alumnos} eliminarElemento={eliminarElemento} />
    </>
  );
};

export default HomeAdminContainer;
