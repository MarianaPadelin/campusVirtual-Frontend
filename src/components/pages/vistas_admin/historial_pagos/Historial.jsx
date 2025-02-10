import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const Historial = ({ alumno }) => {
  return (
    <div className="basicContainer">
      <div className="secondaryContainer">
        <Typography className="titles" variant="h4">
          Historial de pagos
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Fecha</TableCell>
              <TableCell>Monto</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {alumno.pagos &&
              alumno.pagos.map((pago) => (
                <TableRow key={pago._id}>
                  <TableCell>{pago.fecha}</TableCell>
                  <TableCell>$ {pago.monto}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Historial;
