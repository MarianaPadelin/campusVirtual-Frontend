import { Link } from "react-router-dom";
import { Button, Divider, TextField, Typography } from "@mui/material"
const Muestra = () => {
  return (
    <div className="basicContainer">
      <Typography className="titles" variant="h4">
        Campus virtual
      </Typography>
      <div className="secondaryContainer registro">
        <Typography className="titles" variant="h5">
          Iniciar sesión
        </Typography>
        <form className="formContainer">
          <TextField
            label="Usuario"
            variant="filled"
            color="secondary"
            name="usuario"
            // onChange={handleChange}
          />
          <TextField
            label="Contraseña"
            variant="filled"
            color="secondary"
            name="constraseña"
            // onChange={handleChange}
          />

          <Button variant="contained" color="secondary" type="submit">
            Ingresar
          </Button>
          <Link>
            <Typography> Olvidé mi contraseña</Typography>
          </Link>
          <Divider />
          <Link>
            <Typography> Registrarme </Typography>
          </Link>
        </form>
      </div>
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