import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const Asistencias = ({ faltas, año, handleChangeAño, year }) => {
  return (
    <div className="basicContainer">
      <Typography className="titles" variant="h3">
        Asistencias
      </Typography>
      <div className="secondaryContainer">
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
        <Table className="asistencias">
          {window.innerWidth > 768 ? (
            <TableHead>
              <TableCell>Clase</TableCell>
              <TableCell>Total de faltas</TableCell>
              <TableCell>Ausentes</TableCell>
              <TableCell>Faltas disponibles</TableCell>
            </TableHead>
          ) : (
            <TableHead>
              <TableCell>Clase</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Ausentes</TableCell>
              <TableCell>Disponibles</TableCell>
            </TableHead>
          )}

          {faltas.length > 0 ? (
            faltas.map((falta) => (
              <TableRow key={falta.clase}>
                <TableCell>{falta.clase}</TableCell>
                <TableCell>{falta.totalFaltas}</TableCell>
                <TableCell>{falta.ausentes}</TableCell>
                <TableCell>{falta.totalFaltas - falta.ausentes}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4}>
                No hay asistencias registradas en este año
              </TableCell>
            </TableRow>
          )}
        </Table>
      </div>
    </div>
  );
};

export default Asistencias;
