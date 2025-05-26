import { useEffect, useState } from "react";
import VerTps from "./VerTps";
import axios from "axios";

import Loader from "../../../common/loader/Loader";

const VerTpsContainer = () => {
  const today = new Date();
  const year = today.getFullYear();
  const [clase, setClase] = useState("");
  const [año, setAño] = useState(year);
  const [alumnos, setAlumnos] = useState([]);
  const [clasesDisponibles, setClasesDisponibles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const promise = axios.get(`/clases`, { withCredentials: true });
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
    const fetchData = async () => {
      try {
        const res = await axios.get(`/clases/admin/${clase}/${año}`, {
          withCredentials: true,
        });

        if (res.data.status == 404) {
          return setAlumnos([]);
        }

        return setAlumnos(res.data.result);
      } catch (error) {
        console.log(error);
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
        <VerTps
          clasesDisponibles={clasesDisponibles}
          clase={clase}
          año={año}
          year={year}
          alumnos={alumnos}
          handleChangeClases={handleChangeClases}
          handleChangeAño={handleChangeAño}
        />
      )}
    </>
  );
};

export default VerTpsContainer;
