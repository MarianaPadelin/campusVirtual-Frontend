import { useContext, useEffect, useState } from "react";
import Material from "./Material";
import axios from "axios";
import { UserContext } from "../../../../context/UserContext";
import Loader from "../../../common/loader/Loader";

const MaterialContainer = () => {
  const { id } = useContext(UserContext);
  const today = new Date();
  const year = today.getFullYear();
  const [clase, setClase] = useState("");
  const [año, setAño] = useState(year);
  const [clasesDisponibles, setClasesDisponibles] = useState([]);
  const [archivos, setArchivos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const promise = axios.get(`/clases/alumno/${id}/${año}`, {
      withCredentials: true,
    });
    promise
      .then((res) => {
        if (res.data.status === 200) {
          return setClasesDisponibles(res.data.nombreClases);
        }
        return setClasesDisponibles([]);
      })
      .catch((err) => console.log(err));
  }, [año, id]);

  const handleChangeClases = (e) => {
    const claseSeleccionada = e.target.value;
    setClase(claseSeleccionada);
  };
  const handleChangeAño = (e) => {
    const añoSeleccionado = e.target.value;
    setAño(añoSeleccionado);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/material/${clase}/${año}`, {
          withCredentials: true,
        });
        console.log(res);
        if (res.data.status === 200) {
          return setArchivos(res.data.result);
        } else if (res.data.status === 404) {
          return setArchivos([]);
        } else {
          return setArchivos([]);
        }
      } catch (error) {
        console.log(error);
        //  Swal.fire({
        //             text: "Error del servidor",
        //             icon: "error",
        //           });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [clase, año]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Material
          clase={clase}
          clasesDisponibles={clasesDisponibles}
          handleChangeClases={handleChangeClases}
          handleChangeAño={handleChangeAño}
          año={año}
          archivos={archivos}
          year={year}
        />
      )}
    </>
  );
};

export default MaterialContainer;
