import { Table, TableCell, TableHead, TableRow, Typography } from "@mui/material";

const Asistencias = () => {
  return (
    <div className="basicContainer">
      <Typography className="titles" variant="h4">
        Asistencias
      </Typography>
      <Table>
        <TableHead>
          <TableCell>Clase</TableCell>
          <TableCell>Ausentes</TableCell>
          <TableCell>Faltas disponibles</TableCell>
        </TableHead>
        <TableRow>
          <TableCell>Acrobacia</TableCell>
          <TableCell>5</TableCell>
          <TableCell>8</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Preparación física</TableCell>
          <TableCell>3</TableCell>
          <TableCell>7</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Danza</TableCell>
          <TableCell>2</TableCell>
          <TableCell>10</TableCell>
        </TableRow>
      </Table>
    </div>
  );
};

export default Asistencias;
