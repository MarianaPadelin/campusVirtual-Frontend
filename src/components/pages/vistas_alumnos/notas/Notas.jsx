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

const Notas = () => {
  return (
    <div className="basicContainer">
      <Typography className="titles" variant="h4">
        Notas
      </Typography>
      <FormControl className="classSelector">
        <InputLabel id="demo-simple-select-label">Seleccionar año</InputLabel>
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
      <Table>
        <TableHead>
          <TableCell>Clase</TableCell>
          <TableCell>Profesor</TableCell>
          <TableCell>Nota julio</TableCell>
          <TableCell>Nota diciembre</TableCell>
        </TableHead>
        <TableRow>
          <TableCell>Acrobacia</TableCell>
          <TableCell>Profesor A</TableCell>
          <TableCell>5</TableCell>
          <TableCell>8</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Preparación física</TableCell>
          <TableCell>Profesor B</TableCell>

          <TableCell>3</TableCell>
          <TableCell>7</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Danza</TableCell>
          <TableCell>Profesor C</TableCell>

          <TableCell>2</TableCell>
          <TableCell>10</TableCell>
        </TableRow>
      </Table>
    </div>
  );
};

export default Notas;
