import { Button, TextField, Typography } from "@mui/material";


//Mandar la primer letra en mayúscula

const Registro = ({ handleChange, handleSubmit, errors }) => {



 
  return (
    <div className="basicContainer">
      <Typography className="titles" variant="h3">
        Ingrese los datos del nuevo alumno
      </Typography>

      <div className="secondaryContainer registro">
        <form className="formContainer" onSubmit={handleSubmit}>
          <TextField
            label="Nombre"
            variant="filled"
            name="nombre"
            onChange={handleChange}
          />
          <TextField
            label="Apellido"
            variant="filled"
            name="apellido"
            onChange={handleChange}
          />
          <TextField
            label="Email"
            variant="filled"
            type="email"
            name="email"
            onChange={handleChange}
            error={errors.email ? true : false}
            helperText={errors.email}
          />
          <TextField
            label="Celular"
            variant="filled"
            name="celular"
            onChange={handleChange}
            error={errors.celular ? true : false}
            helperText={errors.celular}
          />
          <Button variant="contained" type="submit">
            Enviar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Registro;
