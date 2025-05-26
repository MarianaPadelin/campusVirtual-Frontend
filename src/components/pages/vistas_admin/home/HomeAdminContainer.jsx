import { useEffect, useState } from "react";
import HomeAdmin from "./HomeAdmin";
import axios from "axios";
import Swal from "sweetalert2";
import Loader from "../../../common/loader/Loader";

const HomeAdminContainer = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/alumnos`, {
          withCredentials: true,
        });
        if (res.data.status === 200) {
          return setAlumnos(res.data.alumnos);
        }
        return setAlumnos([]);
      } catch (error) {
        console.log(error);
        Swal.fire({
          text: "Error del servidor",
          icon: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const eliminarElemento = (id, email) => {
    Swal.fire({
      title:
        "¿Seguro que desea eliminar al alumno? Quedará borrado de la base de datos de forma permanente",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const promise = axios.delete(`/alumnos/${id}`, {
          withCredentials: true,
        });

        promise
          .then(() => {
            axios
              .delete(`/session/${email}`, { withCredentials: true })

              .then((res) => {
                console.log(res);
                if (res.data.status === 200) {
                  return Swal.fire({
                    icon: "success",
                    text: "Alumno eliminado",
                    timer: 1500,
                  });
                }
              })
              .then(() => {
                axios
                  .get(`/alumnos`, {
                    withCredentials: true,
                  })
                  .then((res) => setAlumnos(res.data.alumnos))
                  .catch((err) => console.log(err));
              });
          })

          .catch((err) =>
            console.log("Hubo un error: " + err + ". El id recibido es: " + id)
          );
      }
    });
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <HomeAdmin alumnos={alumnos} eliminarElemento={eliminarElemento} />
      )}
    </>
  );
};

export default HomeAdminContainer;
