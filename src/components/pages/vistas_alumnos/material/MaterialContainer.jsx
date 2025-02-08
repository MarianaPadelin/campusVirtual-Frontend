import { useEffect, useState } from "react";
import Material from "./Material";
import axios from "axios";

const MaterialContainer = () => {
  const hoy = new Date();
  const defaultAño = hoy.getFullYear();
  const [clase, setClase] = useState("");
  const [año, setAño] = useState(defaultAño);
  const [clasesDisponibles, setClasesDisponibles] = useState([]);
  const [archivos, setArchivos] = useState([]);
  
  //en vez de todas las clases tendría que ver sólo las suyas
  useEffect(() => {
    const promise = axios.get(`/clases`);
    promise
      .then((res) => setClasesDisponibles(res.data))
      .catch((err) => console.log(err));
  }, []);

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
