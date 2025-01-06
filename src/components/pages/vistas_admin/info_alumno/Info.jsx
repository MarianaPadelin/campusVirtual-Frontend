import { Button, List, ListItem, Typography } from "@mui/material";
import { Link } from "react-router-dom";
//mostrarlo como un formulario, con el placeholder que tenga el dato viejo
//const {} = useFormik({
//   initialValues: { nombre: {alumnoEncontrado.nombre}}
const Info = ({ alumnoEncontrado }) => {
  return (
    <div className="basicContainer">
      <div className="secondaryContainer">
        <Typography className="titles" variant="h4">
          Datos de contacto
        </Typography>
        <List>
          <ListItem>
            <Typography color="secondary" variant="h5">
              {alumnoEncontrado.nombre} {alumnoEncontrado.apellido}
            </Typography>
          </ListItem>
          <ListItem>
            <Typography>Email de contacto: {alumnoEncontrado.email}</Typography>
          </ListItem>
          <ListItem>
            <Typography>
              Celular de contacto: {alumnoEncontrado.celular}
            </Typography>
          </ListItem>
        </List>

        <Link to="/admin">
          <Button color="secondary" variant="contained">
            Volver al listado de alumnos{" "}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Info;
