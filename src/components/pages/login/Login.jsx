import { Link } from "react-router-dom";
import {
  Button,
  Divider,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Login = ({
  handleChange,
  handleSubmit,
  handleViewPass,
  verContraseña,
}) => {
  return (
    <div className="basicContainer">
      <Typography className="titles" variant="h4">
        Campus virtual
      </Typography>
      <div className="secondaryContainer registro">
        <Typography className="titles" variant="h5">
          Iniciar sesión
        </Typography>
        <form className="formContainer" onSubmit={handleSubmit}>
          <TextField
            label="Usuario"
            variant="filled"
            color="secondary"
            name="email"
            onChange={handleChange}
          />
          {verContraseña ? (
            <TextField
              label="Contraseña"
              variant="filled"
              color="secondary"
              name="password"
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <VisibilityOffIcon onClick={handleViewPass} />
                  </InputAdornment>
                ),
              }}
            ></TextField>
          ) : (
            <TextField
              label="Contraseña"
              variant="filled"
              color="secondary"
              name="password"
              type="password"
              onChange={handleChange}
              
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <VisibilityIcon onClick={handleViewPass} />
                  </InputAdornment>
                ),
              }}
            />
          )}

          <Button variant="contained" color="secondary" type="submit">
            Ingresar
          </Button>
          <Link to="/sendEmail">
            <Typography> Olvidé mi contraseña</Typography>
          </Link>
          <Divider />
          <Link to="/register">
            <Typography> Registrarme </Typography>
          </Link>
        </form>
      </div>
      {/* <Link to="/alumnos">
        <Button variant="contained">Ver perfil de alumno</Button>
      </Link>

      <Link to="/admin">
        <Button variant="contained" color="secondary">
          Ver perfil de admin
        </Button>
      </Link> */}
    </div>
  );
};

export default Login;
