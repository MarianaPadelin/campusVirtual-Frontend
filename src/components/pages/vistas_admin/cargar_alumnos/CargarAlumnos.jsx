import {
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const CargarAlumnos = ({
  clasesDisponibles,
  clase,
  handleChangeClases,
  año,
  alumnos,
  handleChangeAño,
  handleChange,
  handleSubmit,
  values,
  borrarAlumnoLista,
  year
}) => {
  return (
    <div className="basicContainer">
      <Typography className="titles" variant="h3">
        Cargar lista de alumnos
      </Typography>
      <div className="secondaryContainer">
        <span className="spanTable">
          <FormControl className="classSelector">
            <InputLabel id="demo-simple-select-label">Clase</InputLabel>

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={clase}
              label="Clase"
              onChange={handleChangeClases}
            >
              {clasesDisponibles &&
                clasesDisponibles.map((c) => {
                  return (
                    <MenuItem key={c} value={c}>
                      {c}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>

          <FormControl className="classSelector">
            <InputLabel id="label-año">Año</InputLabel>
            <Select
              labelId="label-año"
              // id="demo-simple-select"
              value={año}
              label="Clase"
              onChange={handleChangeAño}
            >
              <MenuItem value={year - 3}>{year - 3}</MenuItem>
              <MenuItem value={year - 2}>{year - 2}</MenuItem>
              <MenuItem value={year - 1}>{year - 1}</MenuItem>
              <MenuItem value={year}>{year}</MenuItem>
            </Select>
          </FormControl>
        </span>
        {clase && (
          <div>
            <Table>
              <TableHead>
                <TableCell colSpan="2">Alumno</TableCell>
              </TableHead>
              {alumnos && alumnos.length > 0 ? (
                alumnos.map((alumno) => (
                  <TableRow key={alumno._id}>
                    <TableCell name="id_alumno" value={alumno._id}>
                      {alumno.nombre} {alumno.apellido}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          borrarAlumnoLista(alumno._id);
                        }}
                      >
                        <HighlightOffIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell>
                    <Typography>
                      No hay alumnos anotados en esta clase
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </Table>
            <div className="inputDiv">
              <form onSubmit={handleSubmit}>
                <Typography>Agregar alumno a la clase</Typography>
                <Input
                  placeholder="Nombre"
                  className="inputLista"
                  name="nombre"
                  onChange={handleChange}
                  value={values.nombre}
                ></Input>
                <Input
                  placeholder="Apellido"
                  className="inputLista"
                  name="apellido"
                  onChange={handleChange}
                  value={values.apellido}
                ></Input>
                <Button type="submit" variant="contained">
                  Enviar
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CargarAlumnos;
