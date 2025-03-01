import { Button, Divider, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const ResetIntermedio = ({ handleChange, handleSubmit }) => {
  return (
    <div className="basicContainer">
      <div className="secondaryContainer registro login">
        <Typography className="titles" variant="h3">
          CIRCO DE LAS ARTES
        </Typography>
        <Typography className="titles" variant="h6">
          Ingresá tu mail y te enviaremos un correo para restaurar la contraseña{" "}
        </Typography>
        <form className="formContainer" onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="filled"
            name="email"
            onChange={handleChange}
          />

          <Button variant="contained" type="submit">
            Enviar
          </Button>

          <Divider />
          <Link to="/">
            <Typography> Volver </Typography>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ResetIntermedio;
