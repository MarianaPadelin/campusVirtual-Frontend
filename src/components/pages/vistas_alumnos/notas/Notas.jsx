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

const Notas = ({notas}) => {
  return (
    <div className="basicContainer">
      <Typography className="titles" variant="h4">
        Notas
      </Typography>
      <div className="secondaryContainer">
        <FormControl className="classSelector">
          <InputLabel id="demo-simple-select-label">Año</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={clase}
            label="Clase"
            // onChange={handleChange}
          >
            <MenuItem value={1}>2022</MenuItem>
            <MenuItem value={2}>2023</MenuItem>
            <MenuItem value={3}>2024</MenuItem>
          </Select>
        </FormControl>
        <Table className="asistencias">
          <TableHead>
            <TableCell>Clase</TableCell>
            {/* <TableCell>Profesor</TableCell> */}
            <TableCell>Nota julio</TableCell>
            <TableCell>Nota diciembre</TableCell>
          </TableHead>
          {notas &&
            notas.map((nota) => (
              <TableRow key={nota._id}>
                <TableCell>{nota.clase} </TableCell>
                <TableCell>{nota.notaJulio}</TableCell>
                <TableCell>{nota.notaDiciembre}</TableCell>
              </TableRow>
            ))}
        </Table>
      </div>
    </div>
  );
};

export default Notas;
