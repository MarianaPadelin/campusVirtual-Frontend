import { Table, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Material = () => {
  return (
    <div className="basicContainer">
      <Typography className="titles" variant="h4">
        Ver material didáctico
      </Typography>
      <Table>
        <TableHead>
          <TableCell>Clase</TableCell>
          <TableCell>Fecha de subida</TableCell>
          <TableCell>Archivo</TableCell>
        </TableHead>
        <TableRow>
          <TableCell>Acrobacia</TableCell>
          <TableCell>05/02/25</TableCell>
          <Link>
            <TableCell>Descargar archivo</TableCell>
          </Link>
        </TableRow>
        <TableRow>
          <TableCell>Preparación física</TableCell>
          <TableCell>05/03/25</TableCell>
          <Link>
            <TableCell>Descargar archivo</TableCell>
          </Link>
        </TableRow>
        <TableRow>
          <TableCell>Danza</TableCell>
          <TableCell>15/03/25</TableCell>
          <Link>
            <TableCell>Descargar archivo</TableCell>
          </Link>
        </TableRow>
      </Table>
    </div>
  );
}

export default Material