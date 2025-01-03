import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
//mostrarlo como un formulario, con el placeholder que tenga el dato viejo
//const {} = useFormik({
//   initialValues: { nombre: {alumnoEncontrado.nombre}}
const Info = ({ alumnoEncontrado }) => {
  return (
    <div className="basicContainer">
  <Typography className="titles" variant="h4">Datos de contacto </Typography>
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
