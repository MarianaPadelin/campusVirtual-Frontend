import { Button } from "@mui/material";
import { Link } from "react-router-dom";
//mostrarlo como un formulario, con el placeholder que tenga el dato viejo
const Info = ({ alumnoEncontrado }) => {
  return (
    <div className="basicContainer">
      <h1>Datos de contacto</h1>
      <ul>
        <li>{alumnoEncontrado.nombre}</li>
        <li>{alumnoEncontrado.apellido}</li>
        <li>{alumnoEncontrado.email}</li>
        <li>{alumnoEncontrado.celular}</li>
      </ul>

      <Link to="/admin">
        <Button color="secondary" variant="contained" >Volver al listado de alumnos </Button>
      </Link>
    </div>
  );
};

export default Info;
