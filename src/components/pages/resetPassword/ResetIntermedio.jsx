import { Button, Divider, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const ResetIntermedio = ({ handleChange, handleSubmit}) => {
  return (
    <div className="basicContainer">
      <Typography className="titles" variant="h4">
Ingresá tu mail y te enviaremos un correo para restaurar la contraseña      </Typography>
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
          

          <Button variant="contained" color="secondary" type="submit">
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
}

export default ResetIntermedio