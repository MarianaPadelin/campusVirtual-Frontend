import { Button, TextField, Typography } from "@mui/material";

const AgregarClase = ({ formik }) => {
    const { handleChange, handleSubmit, values } = formik;
  return (
    <div className="basicContainer">
      <Typography className="titles" variant="h4">
        Ingrese los datos de la nueva clase
      </Typography>

      <div className="secondaryContainer registro">
        <form className="formContainer" onSubmit={handleSubmit}>
          <TextField
            label="Clase"
            variant="filled"
            color="secondary"
            name="nombre"
            onChange={handleChange}
            value={values.nombre}
          />
          <TextField
            label="Profesor"
            variant="filled"
            color="secondary"
            name="profesor"
            onChange={handleChange}
            value={values.profesor}
          />
          <TextField
            label="Año"
            variant="filled"
            color="secondary"
            name="año"
            onChange={handleChange}
            value={values.año}
          />
          <TextField
            label="Faltas disponibles"
            variant="filled"
            color="secondary"
            name="faltas"
            onChange={handleChange}
            value={values.faltas}
          />
          <Button variant="contained" color="secondary" type="submit">
            Enviar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AgregarClase;
