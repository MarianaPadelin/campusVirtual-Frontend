import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

const RegistrarPagos = ({
  alumnos,
  formik,
  montoPorAlumno,
  handleMontoChange,
}) => {
  const { handleSubmit, setFieldValue, errors } = formik;

  return (
    <div className="basicContainer">
      <Typography className="titles" variant="h4">
        Registro de pagos
      </Typography>
      <div className="secondaryContainer">
        <form onSubmit={handleSubmit}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Alumno</TableCell>
                <TableCell>Monto</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {alumnos &&
                alumnos.map((alumno) => (
                  <TableRow
                    key={alumno._id}
                    onClick={() => setFieldValue("id_alumno", alumno._id)}
                  >
                    <TableCell>
                      {alumno.nombre} {alumno.apellido}
                    </TableCell>
                    <TableCell>
                      <span>
                        <Typography className="signoPesos">$</Typography>
                        <TextField
                        // type="number"
                          variant="outlined"
                          className="inputPagos"
                          name={`monto-${alumno._id}`} // Unique identifier
                          value={montoPorAlumno[alumno._id] || ""} // Use the specific monto for this alumno
                          onChange={(e) => handleMontoChange(alumno._id, e.target.value)}
                          error={errors.monto ? true : false}
                          helperText={errors.monto}
                        />
                      </span>
                    </TableCell>
                    <TableCell>
                      <span>
                        <Button
                          type="submit"
                          variant="contained"
                          color="secondary"
                        >
                          Enviar
                        </Button>
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </form>
      </div>
    </div>
  );
};

export default RegistrarPagos;
