import { Link } from "react-router-dom";
import { Button, Divider, InputAdornment, TextField, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const ResetPassword = ({
  handleChange,
  handleSubmit,
  errors,
  verContraseña,
  handleViewPass,
}) => {
  return (
    <div className="basicContainer">
      <Typography className="titles" variant="h4">
        Campus virtual
      </Typography>
      <div className="secondaryContainer registro">
        <Typography className="titles" variant="h5">
          Cambiar contraseña
        </Typography>
        <form className="formContainer" onSubmit={handleSubmit}>
          <TextField
            label="Usuario (email)"
            variant="filled"
            color="secondary"
            name="email"
            onChange={handleChange}
            error={errors.email ? true : false}
            helperText={errors.email}
          />
          {verContraseña ? (
            <TextField
              label="Nueva Contraseña"
              variant="filled"
              color="secondary"
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
              label="Nueva Contraseña"
              variant="filled"
              color="secondary"
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
              color="secondary"
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
              color="secondary"
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
          <Button variant="contained" color="secondary" type="submit">
            Ingresar
          </Button>

          <Divider />
          <Link to="/">
            <Typography> Iniciar sesión </Typography>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
