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

const Notas = ({ notas, año, handleChangeAño, year }) => {
  return (
    <div className="basicContainer">
      <Typography className="titles" variant="h3">
        Notas
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
          <TableHead>
            <TableCell>Clase</TableCell>
            <TableCell>Nota julio</TableCell>
            <TableCell>Nota diciembre</TableCell>
          </TableHead>
          {notas.length > 0 ? (
            notas.map((nota) => (
              <TableRow key={nota._id}>
                <TableCell>{nota.clase} </TableCell>
                <TableCell>{nota.notaJulio}</TableCell>
                <TableCell>{nota.notaDiciembre}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3}>
                No hay notas registradas en este año
              </TableCell>
            </TableRow>
          )}
        </Table>
      </div>
    </div>
  );
};

export default Notas;
