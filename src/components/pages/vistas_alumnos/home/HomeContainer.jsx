import { useContext, useEffect, useState } from "react";
import Home from "./Home";
import axios from "axios";
import Loader from "../../../common/loader/Loader";
import { UserContext } from "../../../../context/UserContext";

//tengo que crear un contexto para el alumno

const HomeContainer = () => {
  const [alumno, setAlumno] = useState({});
  const { mostrarDatosAlumno } = useContext(UserContext)

  mostrarDatosAlumno(alumno)
  useEffect(() => {
    const promise = axios.get(`/alumno`, { withCredentials: true });
    promise
      .then((res) => {
        if (res.data.user) {
          const userMail = res.data.user.email;
          // console.log(userMail)
          const promise2 = axios.get(`/alumnos/${userMail}`);
          promise2
            .then((res) => setAlumno(res.data.alumno))
            .catch((err) => console.log(err));
        }
      })

      .catch((err) => console.log(err));
  }, []);

  return <>{(alumno.email) ? <Home alumno={alumno} /> : <Loader />}</>;
};

export default HomeContainer;
