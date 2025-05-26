import {
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
import { Link } from "react-router-dom";

const VerTps = ({
  clasesDisponibles,
  clase,
  año,
  year,
  alumnos,
  handleChangeClases,
  handleChangeAño,
}) => {
  return (
    <div className="basicContainer">
      <Typography className="titles" variant="h3">
        Trabajos prácticos
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
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  {" "}
                  Alumnos de la clase {clase} {year}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {alumnos && alumnos.length > 0 ? (
                alumnos.map((alumno) => (
                  <TableRow key={alumno._id}>
                    <TableCell>
                      <Link
                        to={`/admin/tps/${alumno._id}/${clase}/${año}`}
                        title="Ver tps del alumno"
                      >
                        {alumno.nombre} {alumno.apellido}
                      </Link>
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
        )}
      </div>
    </div>
  );
};

export default VerTps;
