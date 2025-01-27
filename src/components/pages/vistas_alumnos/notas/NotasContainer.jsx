import { useContext, useEffect, useState } from "react";
import Notas from "./Notas";
import axios from "axios";
// import Loader from "../../../common/loader/Loader";
import { UserContext } from "../../../../context/UserContext";
import Forbidden from "../../forbidden/Forbidden";

const NotasContainer = () => {
  const [notas, setNotas] = useState([]);
  const [año, setAño] = useState(2025);

  const { rolUsuario, id } = useContext(UserContext);


   const handleChangeAño = (e) => {
     const añoSeleccionado = e.target.value;
     setAño(añoSeleccionado);
   };


  useEffect(() => {
    const promise = axios.get(`/alumnos/${id}/notas/${año}`, {
      withCredentials: true,
    });
    promise
      // .then((res) => console.log(res.data))
      .then((res) => {
        if(res.data.status == 404){
        setNotas([])
      }
      setNotas(res.data.result)
    })
      .catch((err) => console.log(err));

  }, [id, año]);

  return <> 
    {rolUsuario == "alumno" ? (<Notas notas={notas} año={año} handleChangeAño={handleChangeAño} />) : (<Forbidden />) }
  </>;
};

export default NotasContainer;
