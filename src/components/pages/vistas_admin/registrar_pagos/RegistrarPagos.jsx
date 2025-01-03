import { Button, Table, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";

const RegistrarPagos = ({ alumnos }) => {
  return (
    <div className="basicContainer">
      <Typography className="titles" variant="h4">
        Registro de pagos
      </Typography>

      <Table>
        <TableHead>
          <TableCell>Alumno</TableCell>
          <TableCell>Marzo</TableCell>
          <TableCell>Abril</TableCell>
          <TableCell>Mayo</TableCell>
          <TableCell>Junio</TableCell>
          <TableCell>Julio</TableCell>
          <TableCell>Agosto</TableCell>
          <TableCell>Septiembre</TableCell>
          <TableCell>Octubre</TableCell>
          <TableCell>Noviembre</TableCell>
          <TableCell>Diciembre</TableCell>
        </TableHead>

        {alumnos &&
          alumnos.map((alumno) => (
            <TableRow key={alumno._id}>
              <TableCell>{alumno.nombre}</TableCell>
              <TableCell>
                {/* verificar que sea numero */}
                <TextField variant="outlined" className="inputPagos" />
              </TableCell>
              <TableCell>
                <TextField variant="outlined" className="inputPagos" />
              </TableCell>
              <TableCell>
                <TextField variant="outlined" className="inputPagos" />
              </TableCell>
              <TableCell>
                <TextField variant="outlined" className="inputPagos" />
              </TableCell>
              <TableCell>
                <TextField variant="outlined" className="inputPagos" />
              </TableCell>
              <TableCell>
                <TextField variant="outlined" className="inputPagos" />
              </TableCell>
              <TableCell>
                <TextField variant="outlined" className="inputPagos" />
              </TableCell>
              <TableCell>
                <TextField variant="outlined" className="inputPagos" />
              </TableCell>
              <TableCell>
                <TextField variant="outlined" className="inputPagos" />
              </TableCell>
              <TableCell>
                <TextField variant="outlined" className="inputPagos" />
              </TableCell>
            </TableRow>
          ))}
      </Table>
      <Button variant="contained" color="secondary">
        Enviar
      </Button>
    </div>
  );
}

export default RegistrarPagos