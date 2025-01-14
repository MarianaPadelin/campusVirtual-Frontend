import {
  Button,
  // FormControl,
  // InputLabel,
  // MenuItem,
  // Select,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

const RegistrarPagos = ({ alumnos, handleChange, handleSelectStudent, handleSubmit, errors }) => {
 
  return (
    <div className="basicContainer">
      <Typography className="titles" variant="h4">
        Registro de pagos
      </Typography>
      <div className="secondaryContainer">
        {/* <FormControl color="secondary" className="classSelector">
          <InputLabel id="label-clase">Mes</InputLabel>
          <Select
            labelId="label-clase"
            // id="demo-simple-select"
            // value={clase}
            label="Mes"
            onChange={handleChangeMes}
          >
            {meses.map((mes) => {
              return (
                <MenuItem key={mes} value={mes}>
                  {mes}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl> */}
        <form onSubmit={handleSubmit}>
          <Table>
            <TableHead>
              <TableCell>Alumno</TableCell>
              <TableCell>Monto</TableCell>
            </TableHead>

            {alumnos &&
              alumnos.map((alumno) => (
                <TableRow
                  key={alumno._id}
                  onClick={() => handleSelectStudent(alumno._id)}
                >
                  <TableCell>
                    {alumno.nombre} {alumno.apellido}
                  </TableCell>
                  <TableCell>
                    <span>
                      <Typography className="signoPesos">$</Typography>
                      <TextField
                        variant="outlined"
                        className="inputPagos"
                        name="monto"
                        onChange={handleChange}
                        error={errors.monto ? true : false}
                        helperText={errors.monto}
                      />
                    </span>
                  </TableCell>
                  <span>
                    <Button
                      className="buttonForm"
                      type="submit"
                      variant="contained"
                      color="secondary"
                    >
                      Enviar
                    </Button>
                  </span>
                </TableRow>
              ))}
          </Table>
        </form>
      </div>
    </div>
  );
};

export default RegistrarPagos;
