import { Table, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";

const Pagos = () => {
  return (
    <div className="basicContainer">
      <Typography className="titles" variant="h4">
        Pagos
      </Typography>
      <div className="secondaryContainer">
        <Table>
          <TableHead>
            <TableCell>Mes</TableCell>
            <TableCell>Estado</TableCell>
          </TableHead>
          <TableRow>
            <TableCell>Marzo</TableCell>
            <TableCell>Pagado</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Abril</TableCell>
            <TableCell>Pagado</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Mayo</TableCell>
            <TableCell>Debe</TableCell>
          </TableRow>
        </Table>
        <span>
          <WarningIcon color="error" />
          <Typography> Su deuda al día de hoy es: $...</Typography>
        </span>
      </div>
    </div>
  );
};

export default Pagos;
