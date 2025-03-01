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
      <div className="secondaryContainer registro login">
        <Typography className="titles" variant="h3">
          CIRCO DE LAS ARTES
        </Typography>
        <Typography className="titles" variant="h5">
          Iniciar sesión
        </Typography>
        <form className="formContainer" onSubmit={handleSubmit}>
          <TextField
            label="Usuario (email)"
            variant="filled"
            name="email"
            onChange={handleChange}
          />
          {verContraseña ? (
            <TextField
              label="Contraseña"
              variant="filled"
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

          <Button variant="contained" type="submit">
            Ingresar
          </Button>
          <Link to="/sendEmail">
            <Typography> Olvidé mi contraseña</Typography>
          </Link>
          <Divider />
          <Link to="/register">
            <Typography> ¿Todavía no tenés una cuenta? Registrarme </Typography>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
