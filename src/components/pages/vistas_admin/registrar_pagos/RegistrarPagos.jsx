import { Button, FormControl, InputLabel, MenuItem, Select, Table, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";

const RegistrarPagos = ({ alumnos }) => {
  return (
    <div className="basicContainer">
      <Typography className="titles" variant="h4">
        Registro de pagos
      </Typography>
      <div className="secondaryContainer">
        <FormControl color="secondary" className="classSelector">
          <InputLabel id="label-clase">Mes</InputLabel>
          <Select
            labelId="label-clase"
            // id="demo-simple-select"
            // value={clase}
            label="Mes"
            // onChange={handleChange}
          >
            <MenuItem value={1}>Marzo</MenuItem>
            <MenuItem value={2}>Abril</MenuItem>
            <MenuItem value={3}>Mayo</MenuItem>
            <MenuItem value={3}>Junio</MenuItem>
            <MenuItem value={3}>Julio</MenuItem>
            <MenuItem value={3}>Agosto</MenuItem>
            <MenuItem value={3}>Septiembre</MenuItem>
            <MenuItem value={3}>Octubre</MenuItem>
            <MenuItem value={3}>Novimebre</MenuItem>
            <MenuItem value={3}>Diciembre</MenuItem>
          </Select>
        </FormControl>
        <Table>
          <TableHead>
            <TableCell>Alumno</TableCell>
            <TableCell>Monto</TableCell>
          </TableHead>

          {alumnos &&
            alumnos.map((alumno) => (
              <TableRow key={alumno._id}>
                <TableCell>{alumno.nombre}</TableCell>
                <TableCell>
                  {/* verificar que sea numero */}
                  <TextField variant="outlined" className="inputPagos" />
                </TableCell>
              </TableRow>
            ))}
        </Table>
        <Button variant="contained" color="secondary">
          Enviar
        </Button>
      </div>
    </div>
  );
}

export default RegistrarPagos