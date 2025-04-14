// import { DataGrid } from "@mui/x-data-grid";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import {
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const RegistrarAsistencias = ({
  clase,
  año,
  clasesDisponibles,
  handleChangeClases,
  alumnos,
  handleChangeAño,
  handleSelectAsistencia,
  handleSubmit,
  values,
  asistencias,
}) => {
  return (
    <div className="basicContainer">
      <Typography className="titles" variant="h3">
        Registro de asistencias
      </Typography>

      <div className="secondaryContainer">
        <span className="spanTable">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              className="datePicker"
              label="Seleccionar fecha"
              onChange={handleChangeAño}
            />
          </LocalizationProvider>
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
        </span>

        {clase && (
          <form onSubmit={handleSubmit}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Alumno</TableCell>
                  <TableCell>Ausente</TableCell>
                </TableRow>
              </TableHead>

              {asistencias.length > 0 ? (
                <TableBody>
                  {asistencias.map((a) => (
                    <TableRow key={a.id_alumno._id}>
                      <TableCell>
                        {a.id_alumno.nombre} {a.id_alumno.apellido}
                      </TableCell>
                      <TableCell>
                        {a.asistencia == true ? "Ausente" : "Presente"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              ) : alumnos && alumnos.length > 0 ? (
                <TableBody>
                  {alumnos.map((alumno) => (
                    <TableRow
                      key={alumno._id}

                      // onClick={() => handleSelectStudent(alumno._id)}
                    >
                      <TableCell name="id_alumno" value={values._id}>
                        {alumno.nombre} {alumno.apellido}
                      </TableCell>

                      <TableCell>
                        <Checkbox
                          onChange={(e) =>
                            handleSelectAsistencia(alumno._id, e.target.checked)
                          }
                          nombre="asistencia"
                          sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={2}>
                      <Button type="submit" variant="contained">
                        Enviar
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : (
                <TableBody>
                  <TableRow>
                    <TableCell colSpan="2">
                      <Typography>
                        No hay alumnos para la clase {clase} del año {año}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegistrarAsistencias;
