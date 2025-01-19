import { Link } from "react-router-dom";
import { Button, Divider, TextField, Typography } from "@mui/material";

const ResetPassword = ({ handleChange, handleSubmit, errors }) => {
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
            label="Usuario"
            variant="filled"
            color="secondary"
            name="email"
            onChange={handleChange}
            error={errors.email ? true : false}
            helperText={errors.email}
          />
          <TextField
            label="Nueva contraseña"
            variant="filled"
            color="secondary"
            name="password"
            type="password"
            onChange={handleChange}
            error={errors.password ? true : false}
            helperText={errors.password}
          />
          <TextField
            label="Repetir nueva contraseña"
            variant="filled"
            color="secondary"
            name="repeatPassword"
            type="password"
            onChange={handleChange}
            error={errors.repeatPassword ? true : false}
            helperText={errors.repeatPassword}
          />
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
