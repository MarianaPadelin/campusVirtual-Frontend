// import { DataGrid } from "@mui/x-data-grid";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// import Paper from "@mui/material/Paper";
import { Button, Checkbox, FormControl, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";

const RegistrarAsistencias = ({ clase, año, clasesDisponibles, handleChangeClases, alumnos, handleChangeAño, handleSelectStudent, handleSelectAsistencia, handleSubmit, values }) => {

  return (
    <div className="basicContainer">
      <Typography className="titles" variant="h4">
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
          <FormControl color="secondary" className="classSelector">
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
        {/* <Paper
          sx={{ height: 450, width: "100%" }}
          className="asistenciasContainer"
        >
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </Paper> */}
        {clase && (
          <form onSubmit={handleSubmit}>
            <Table>
              <TableHead>
                <TableCell>Alumno</TableCell>
                <TableCell>Asistencia</TableCell>
              </TableHead>
              <TableBody>
                {alumnos && alumnos.length > 0 ? (
                  alumnos.map((alumno) => (
                    <TableRow
                      key={alumno._id}
                      onClick={() => handleSelectStudent(alumno._id)}
                    >
                      <TableCell name="id_alumno" value={values._id}>
                        {alumno.nombre} {alumno.apellido}
                      </TableCell>

                      <TableCell>
                        <Checkbox
                          onChange={handleSelectAsistencia}
                          nombre="asistencia"
                          sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colspan="2">
                      <Typography>
                        No hay alumnos para la clase {clase} del año {año}
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <Button type="submit" variant="contained" color="secondary">
              Enviar
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegistrarAsistencias;
