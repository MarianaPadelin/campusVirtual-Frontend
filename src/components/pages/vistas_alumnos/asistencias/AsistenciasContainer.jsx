import { useContext, useEffect, useState } from "react";
import Asistencias from "./Asistencias";
import axios from "axios";
import { UserContext } from "../../../../context/UserContext";

const AsistenciasContainer = () => {
  const [faltas, setFaltas] = useState([]);
  const [año, setAño] = useState(2025);
  const { id } = useContext(UserContext);

  const handleChangeAño = (e) => {
    const añoSeleccionado = e.target.value;
    setAño(añoSeleccionado);
  };

  useEffect(() => {
    const promise = axios.get(`/alumnos/${id}/asistencias/${año}`, {
      withCredentials: true,
    });

    promise
      .then((res) => {
        console.log(res.data)
        if (res.data.status === 200) {
          return setFaltas(res.data.asistenciasPorClase);
        }
        return setFaltas([]);
      })
      .catch((error) => console.log(error));
  }, [id, año]);
  return (
    <>
      <Asistencias
        faltas={faltas}
        año={año}
        handleChangeAño={handleChangeAño}
      />
    </>
  );
};

export default AsistenciasContainer;
