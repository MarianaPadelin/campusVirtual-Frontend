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

const Register = ({
  handleChange,
  handleSubmit,
  errors,
  verContraseña,
  handleViewPass,
}) => {
  return (
    <div className="basicContainer">
      <div className="secondaryContainer registro login">
        <Typography className="titles" variant="h3">
          CIRCO DE LAS ARTES
        </Typography>
        <Typography className="titles" variant="h5">
          Registrarse
        </Typography>
        <form className="formContainer" onSubmit={handleSubmit}>
          <TextField
            label="Usuario (email)"
            variant="filled"
            name="email"
            onChange={handleChange}
            error={errors.email ? true : false}
            helperText={errors.email}
          />
          {verContraseña ? (
            <TextField
              label="Contraseña"
              variant="filled"
              name="password"
              onChange={handleChange}
              error={errors.password ? true : false}
              helperText={errors.password}
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
              error={errors.password ? true : false}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <VisibilityIcon onClick={handleViewPass} />
                  </InputAdornment>
                ),
              }}
            />
          )}

          {verContraseña ? (
            <TextField
              label="Repetir Contraseña"
              variant="filled"
              name="repeatPassword"
              onChange={handleChange}
              error={errors.repeatPassword ? true : false}
              helperText={errors.repeatPassword}
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
              label="Repetir Contraseña"
              variant="filled"
              name="repeatPassword"
              type="password"
              onChange={handleChange}
              error={errors.repeatPassword ? true : false}
              helperText={errors.repeatPassword}
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

          <Divider />
          <Link to="/">
            <Typography> ¿Ya tenés una cuenta? Iniciar sesión </Typography>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
