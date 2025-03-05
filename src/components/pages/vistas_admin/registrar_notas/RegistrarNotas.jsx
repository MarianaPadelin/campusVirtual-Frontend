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
// import Loader from "../../../common/loader/Loader";

const RegistrarNotas = ({
  clasesDisponibles,
  clase,
  año,
  alumnos,
  handleChange,
  handleChangeClases,
  handleChangeAño,
  handleSelectStudent,
  handleSubmit,
  values,
  errors,
  year
}) => {
  return (
    <div className="basicContainer">
      <Typography className="titles" variant="h3">
        Registro de notas
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
              value={año}
              label="Año"
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
          <form onSubmit={handleSubmit}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Alumno</TableCell>
                  <TableCell>Nota julio</TableCell>
                  <TableCell>Nota diciembre</TableCell>
                  <TableCell></TableCell>
                </TableRow>
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
                        <TextField
                          variant="outlined"
                          className="inputPagos"
                          name="notaJulio"
                          onChange={handleChange}
                          error={errors.notaJulio ? true : false}
                          helperText={errors.notaJulio}

                          // value={values.notaJulio}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          variant="outlined"
                          className="inputPagos"
                          name="notaDiciembre"
                          onChange={handleChange}
                          error={errors.notaDiciembre ? true : false}
                          helperText={errors.notaDiciembre}

                          // value={values.notaDiciembre}
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          className="buttonForm"
                          type="submit"
                          variant="contained"
                        >
                          Enviar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan="4">
                      <Typography>
                        No hay alumnos para la clase {clase} del año {año}
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegistrarNotas;
