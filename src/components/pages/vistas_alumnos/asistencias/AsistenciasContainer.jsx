import { useContext, useEffect, useState } from "react";
import Asistencias from "./Asistencias";
import axios from "axios";
import { UserContext } from "../../../../context/UserContext";
import Loader from "../../../common/loader/Loader";
import Swal from "sweetalert2";

const AsistenciasContainer = () => {
  const today = new Date();
  const year = today.getFullYear();
  const [faltas, setFaltas] = useState([]);
  const [año, setAño] = useState(year);
  const [loading, setLoading] = useState(true);

  const { id } = useContext(UserContext);

  const handleChangeAño = (e) => {
    const añoSeleccionado = e.target.value;
    setAño(añoSeleccionado);
  };
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/alumnos/${id}/asistencias/${año}`, {
          withCredentials: true,
        });
        if (res.data.status === 200) {
          console.log(res.data.asistenciasPorClase);
          return setFaltas(res.data.asistenciasPorClase);
        }
        return setFaltas([]);
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
  }, [id, año]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Asistencias
          faltas={faltas}
          año={año}
          handleChangeAño={handleChangeAño}
          year={year}
        />
      )}
    </>
  );
};

export default AsistenciasContainer;
