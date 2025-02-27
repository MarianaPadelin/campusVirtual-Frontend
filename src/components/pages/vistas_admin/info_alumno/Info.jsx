import { Button, List, ListItem, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

//mostrarlo como un formulario, con el placeholder que tenga el dato viejo

const Info = ({ alumnoEncontrado, handleClick, showForm, handleChange, handleSubmit, errors, values }) => {
  return (
    <div className="basicContainer">
      <div className="secondaryContainer">
        <Typography className="titles" variant="h4">
          Datos de contacto
        </Typography>
        <List>
          <ListItem>
            <Typography variant="h5">
              {alumnoEncontrado.nombre} {alumnoEncontrado.apellido}
            </Typography>
            <Button onClick={handleClick}>
              <EditIcon />
            </Button>
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
        <Link to={`/admin/historial/${alumnoEncontrado._id}`}>
          <Button
            variant="contained"
            className="buttonWithMargin"
          >
            Ver historial de pagos
          </Button>
        </Link>
        {showForm && (
          <form className="formContainer" onSubmit={handleSubmit}>
            <TextField
              label="Nombre"
              name="nombre"
              value={values.nombre}
              onChange={handleChange}
            />
            <TextField
              label="Apellido"
              name="apellido"
              value={values.apellido}
              onChange={handleChange}
            />
            <TextField
              label="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
              error={errors.email ? true : false}
              helperText={errors.email}
            />

            <TextField
              label="Celular"
              name="celular"
              value={values.celular}
              onChange={handleChange}
              error={errors.celular ? true : false}
              helperText={errors.celular}
            />
            <Button variant="contained" type="submit">
              Modificar
            </Button>
          </form>
        )}

        <Link to="/admin">
          <Button variant="contained">
            Volver al listado de alumnos
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Info;
