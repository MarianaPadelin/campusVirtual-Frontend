import { useEffect, useState } from "react";

import axios from "axios"; 

const HomeAdmin = () => {

  const [alumnos, setAlumnos] = useState([]);
  useEffect( () => {
    axios.defaults.withCredentials = true;
    const promise = axios.get("https://campus-virtual-backend.vercel.app/alumnos");
    promise.then((res) => setAlumnos(res.data).catch(err => console.log(err)))
  }, [])

  return (
    <div>
      {alumnos.map((alumno) => (
        <h1 key={alumno._id}>{alumno.nombre}</h1>
      ))}
    </div>
  )
}

export default HomeAdmin