import { useEffect, useState } from "react";
import HomeAdmin from "./HomeAdmin";
import axios from "axios";
import Swal from "sweetalert2";
import Loader from "../../../common/loader/Loader";

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
    Swal.fire({
      title: "¿Seguro que desea eliminar al alumno? Quedará borrado de la base de datos de forma permanente",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const promise = axios.delete(`/alumnos/${id}`);

        promise
          .then(() => Swal.fire({
            icon:"success",
            text:"Alumno eliminado"
          }))
          .then(() => {
             axios
               .get(`/alumnos`)
               .then((res) => setAlumnos(res.data))
               .catch((err) => console.log(err));

          })
          .catch((err) =>
            console.log(
              "Hubo un error: " + err + ". El id recibido es: " + id
            )
          );
      }
     
    });
  };
  return (
    <>
      {alumnos.length > 0 ? (
        <HomeAdmin alumnos={alumnos} eliminarElemento={eliminarElemento} />
      ) : (
        <Loader />
      )}
    </>
  );
};

export default HomeAdminContainer;
