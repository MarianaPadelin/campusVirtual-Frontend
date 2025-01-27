import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
// import WarningIcon from "@mui/icons-material/Warning";

const Pagos = ({ pagos }) => {
  return (
    <div className="basicContainer">
      <Typography className="titles" variant="h4">
        Pagos
      </Typography>
      <div className="secondaryContainer">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Fecha</TableCell>
              <TableCell>Monto</TableCell>
            </TableRow>
          </TableHead>
        <TableBody>
        {pagos && pagos.map((pago) => (
        <TableRow key={pago._id}>
          <TableCell>{pago.fecha}</TableCell>
          <TableCell>$ {pago.monto}</TableCell>
        </TableRow>

        )
        )}
        </TableBody>
        </Table>
        {/* <span>
          <WarningIcon color="error" />
          <Typography> Su deuda al día de hoy es: $...</Typography>
        </span> */}
      </div>
    </div>
  );
};

export default Pagos;
