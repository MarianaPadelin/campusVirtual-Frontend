import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import EditIcon from "@mui/icons-material/Edit";

const AgregarClase = ({
  handleClick,
  showForm,
  formik,
  datosClase,
  año,
  handleChangeAño,
  borrarClase,
  salir,
}) => {
  const { handleChange, handleSubmit, values, errors } = formik;

  return (
    <div className="basicContainer">
      <Typography className="titles" variant="h4">
        Información sobre las clases
      </Typography>

      <div className="secondaryContainer registro">
        {showForm ? (
          <span className="spanTable">
            <Typography variant="h6">Editar clase</Typography>
            <Button onClick={salir}>
              <HighlightOffIcon color="secondary" />
            </Button>
          </span>
        ) : (
          <Typography variant="h6">Agregar nueva clase</Typography>
        )}
        <form className="formContainer" onSubmit={handleSubmit}>
          <TextField
            label="Clase"
            variant="filled"
            color="secondary"
            name="nombre"
            onChange={handleChange}
            value={values.nombre}
            error={errors.nombre ? true : false}
            helperText={errors.nombre}
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
            error={errors.año ? true : false}
            helperText={errors.año}
          />
          <TextField
            label="Faltas disponibles"
            variant="filled"
            color="secondary"
            name="faltas"
            onChange={handleChange}
            value={values.faltas}
            error={errors.faltas ? true : false}
            helperText={errors.faltas}
          />
          {showForm ? (
            <Button variant="contained" color="secondary" type="submit">
              Modificar
            </Button>
          ) : (
            <Button variant="contained" color="secondary" type="submit">
              Enviar
            </Button>
          )}
        </form>
      </div>
      <div className="secondaryContainer">
        <FormControl color="secondary" className="classSelector">
          <InputLabel id="label-año">Año</InputLabel>
          <Select
            labelId="label-año"
            value={año}
            label="Año"
            onChange={handleChangeAño}
          >
            <MenuItem value={2022}>2022</MenuItem>
            <MenuItem value={2023}>2023</MenuItem>
            <MenuItem value={2024}>2024</MenuItem>
            <MenuItem value={2025}>2025</MenuItem>
          </Select>
        </FormControl>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Clase</TableCell>
              {window.innerWidth > 768 ? (
                <TableCell>Profesor</TableCell>
              ) : (
                <TableCell>Prof.</TableCell>
              )}
              {window.innerWidth > 768 ? (
                <TableCell>Faltas disponibles</TableCell>
              ) : (
                <TableCell>Faltas</TableCell>
              )}

              <TableCell>Editar</TableCell>
              <TableCell>Eliminar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datosClase.length > 0 ? (
              datosClase.map((dato) => (
                <TableRow key={dato._id}>
                  <TableCell>{dato.nombre}</TableCell>
                  <TableCell>{dato.profesor}</TableCell>
                  <TableCell>{dato.faltas}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        handleClick(dato);
                      }}
                    >
                      <EditIcon color="secondary" />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        borrarClase(dato._id);
                      }}
                    >
                      <HighlightOffIcon color="secondary" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6}>No se encontraron clases</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AgregarClase;
