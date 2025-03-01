import "./HomeAdmin.css"

import HomeDesktop from "./HomeDesktop";
import HomeCelu from "./HomeCelu";
import { Typography } from "@mui/material";


//hacer un condicional para celu donde solo se vea el nombre, editar y eliminar

const HomeAdmin = ({ alumnos, eliminarElemento }) => {
  //eliminarElemento

  return (
    <div className="basicContainer">
      <Typography className="titles" variant="h2">
        Listado de alumnos
      </Typography>
      <div className="secondaryContainer">
        {window.innerWidth > 768 ? (
          <HomeDesktop alumnos={alumnos} eliminarElemento={eliminarElemento} />
        ) : (
          <HomeCelu alumnos={alumnos} eliminarElemento={eliminarElemento}/>
        )}
      </div>
    </div>
  );
};

export default HomeAdmin;
