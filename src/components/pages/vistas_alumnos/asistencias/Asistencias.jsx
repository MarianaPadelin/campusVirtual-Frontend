import { Table, TableCell, TableHead, TableRow, Typography } from "@mui/material";

const Asistencias = () => {
  return (
    <div className="basicContainer">
      <Typography className="titles" variant="h4">
        Asistencias
      </Typography>
      <div className="secondaryContainer">
        <Table className="asistencias">
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
            <TableCell>Elongación</TableCell>
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
    </div>
  );
};

export default Asistencias;
