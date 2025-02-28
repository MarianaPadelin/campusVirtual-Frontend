import { useContext, useEffect, useState } from "react";
import Materias from "./Materias";
import axios from "axios";
import { UserContext } from "../../../../context/UserContext";

const MateriasContainer = () => {
  const [materias, setMaterias] = useState([]);
  const { id } = useContext(UserContext);

  const date = new Date();
  const year = date.getFullYear();

  useEffect(() => {
    const promise = axios.get(`/clases/alumno/${id}/${year}`, {
      withCredentials: true,
    });

    promise
      .then((res) => {
        if (res.data.status === 200) {
            console.log(res)
          return setMaterias(res.data.nombreClases);
        }
        return setMaterias([]);
      })
      .catch((err) => console.log(err));
  }, [id, year]);
  return (
    <div>
      <Materias materias={materias} year={year} />
    </div>
  );
};

export default MateriasContainer;
