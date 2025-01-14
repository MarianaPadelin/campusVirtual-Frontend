import { Button, TextField, Typography } from "@mui/material";


//Mandar la primer letra en mayúscula

const Registro = ({ handleChange, handleSubmit, errors }) => {



 
  return (
    <div className="basicContainer">
      <Typography className="titles" variant="h4">
        Ingrese los datos del nuevo alumno
      </Typography>

      <div className="secondaryContainer registro">
        <form className="formContainer" onSubmit={handleSubmit}>
          <TextField
            label="Nombre"
            variant="filled"
            color="secondary"
            name="nombre"
            onChange={handleChange}
          />
          <TextField
            label="Apellido"
            variant="filled"
            color="secondary"
            name="apellido"
            onChange={handleChange}
          />
          <TextField
            label="Email"
            variant="filled"
            color="secondary"
            type="email"
            name="email"
            onChange={handleChange}
            error={errors.email ? true : false}
            helperText={errors.email}
          />
          <TextField
            label="Celular"
            variant="filled"
            color="secondary"
            name="celular"
            onChange={handleChange}
            error={errors.celular ? true : false}
            helperText={errors.celular}
          />
          <Button variant="contained" color="secondary" type="submit">
            Enviar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Registro;
