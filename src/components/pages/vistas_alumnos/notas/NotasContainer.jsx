import { useEffect, useState } from "react";
import Notas from "./Notas";
import axios from "axios";
import Loader from "../../../common/loader/Loader";

const NotasContainer = () => {
  const [notas, setNotas] = useState([]);
  //una vez que agarre el id dinámico, desestructurarlo
const id = "677c4ea0899ac18cdb7cfcb5";
    useEffect(() => {
    const promise = axios
      .get(`/alumnos/${id}/notas`)
      promise
        // .then((res) => console.log(res.data.result))
        .then((res) => setNotas(res.data.result))
        .catch((err) => console.log(err));

      console.log(notas);
  }, [id]);

  
  return (
    <>
    {notas.length > 0 ? ( <Notas notas={notas} />) : (<Loader />)}
     
    </>
  );
};

export default NotasContainer;
