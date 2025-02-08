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

const Notas = ({ notas, año, handleChangeAño }) => {
  return (
    <div className="basicContainer">
      <Typography className="titles" variant="h4">
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
            <MenuItem value={2022}>2022</MenuItem>
            <MenuItem value={2023}>2023</MenuItem>
            <MenuItem value={2024}>2024</MenuItem>
            <MenuItem value={2025}>2025</MenuItem>
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
              <TableCell colSpan={3}> No hay notas registradas en este año</TableCell>
            </TableRow>
          )}
        </Table>
      </div>
    </div>
  );
};

export default Notas;
