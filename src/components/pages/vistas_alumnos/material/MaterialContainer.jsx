import { useContext, useEffect, useState } from "react";
import Material from "./Material";
import axios from "axios";
import { UserContext } from "../../../../context/UserContext";

const MaterialContainer = () => {
  const { id } = useContext(UserContext);
  const hoy = new Date();
  const defaultAño = hoy.getFullYear();
  const [clase, setClase] = useState("");
  const [año, setAño] = useState(defaultAño);
  const [clasesDisponibles, setClasesDisponibles] = useState([]);
  const [archivos, setArchivos] = useState([]);

  useEffect(() => {
    const promise = axios.get(`/clases/alumno/${id}/${año}`);
    promise
      .then((res) => {
        if (res.data.status === 200) {
         return setClasesDisponibles(res.data.nombreClases);
        }
        return setClasesDisponibles([])
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
    const promise = axios.get(`/material/${clase}/${año}`, {
      withCredentials: true,
    });

    promise
      .then((res) => {
        if (res.data.status === 200) {
          return setArchivos(res.data.result);
        }
        return setArchivos([]);
      })
      // .then(() => console.log(archivos))
      .catch((err) => console.log(err));
  }, [clase, año]);

  return (
    <>
      <Material
        clase={clase}
        clasesDisponibles={clasesDisponibles}
        handleChangeClases={handleChangeClases}
        handleChangeAño={handleChangeAño}
        año={año}
        archivos={archivos}
      />
    </>
  );
};

export default MaterialContainer;
