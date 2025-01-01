import { Link } from "react-router-dom";
import { Button } from "@mui/material"
const Muestra = () => {
  return (
    <div className="basicContainer">
      <h1>¿Qué perfil querés ver?</h1>

      <Link to="/alumnos">
        <Button variant="contained">Ver perfil de alumno</Button>
      </Link>

      <Link to="/admin">
        <Button variant="contained" color="secondary">
          Ver perfil de admin
        </Button>
      </Link>
    </div>
  );
}

export default Muestra