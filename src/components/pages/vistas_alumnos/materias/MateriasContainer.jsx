import { useContext, useEffect, useState } from "react";
import Materias from "./Materias";
import axios from "axios";
import { UserContext } from "../../../../context/UserContext";
import Loader from "../../../common/loader/Loader";

const MateriasContainer = () => {
  const [materias, setMaterias] = useState([]);
  const { id } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  const date = new Date();
  const year = date.getFullYear();

  useEffect(() => {
     const fetchData = async () => {
       try {
        const res = await axios.get(`/clases/alumno/${id}/${year}`, {
          withCredentials: true,
        });
        if (res.data.status === 200) {
          return setMaterias(res.data.nombreClases);
        }
        return setMaterias([]);
       } catch (error) {
         console.log(error);
       } finally {
         setLoading(false);
       }

     };
       fetchData();
    
  }, [id, year]);
  return (
    <div>
        {loading ? (
        <Loader />
      ) : (
      <Materias materias={materias} year={year} />) } 
    </div>
  );
};

export default MateriasContainer;
