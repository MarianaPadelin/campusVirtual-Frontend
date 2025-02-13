import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MonthCalendar } from "@mui/x-date-pickers/MonthCalendar";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import EditIcon from "@mui/icons-material/Edit";

const VerPagos = ({
  año,
  handleChangeAño,
  handleChangeMes,
  pagos,
  editarPago,
  eliminarPago,
  pagoEditor,
  handleMontoChange,
  formik
}) => {
  return (
    <div className="basicContainer">
      <Typography className="titles" variant="h4">
        Ver pagos por mes
      </Typography>

      <div className="secondaryContainer">
        <span className="spanTable">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer  components={["MonthCalendar"]}>
              <DemoItem label="Seleccionar Mes">
                <MonthCalendar  onChange={handleChangeMes} />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>
          <FormControl color="secondary" className="classSelector">
            <InputLabel id="label-año">Año</InputLabel>
            <Select
              labelId="label-año"
              value={año}
              label="Clase"
              onChange={handleChangeAño}
            >
              <MenuItem value={2022}>2022</MenuItem>
              <MenuItem value={2023}>2023</MenuItem>
              <MenuItem value={2024}>2024</MenuItem>
              <MenuItem value={2025}>2025</MenuItem>
            </Select>
          </FormControl>
        </span>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Alumno</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Monto</TableCell>
              <TableCell>Editar</TableCell>
              <TableCell>Eliminar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pagos.length > 0 ? (
              pagos.map((pago) => (
                <TableRow key={pago._id}>
                  <TableCell>
                    {pago.id_alumno.nombre} {pago.id_alumno.apellido}
                  </TableCell>
                  <TableCell>{pago.fecha}</TableCell>
                  {pagoEditor ? (
                    <TableCell>
                      <form onSubmit={formik.handleSubmit}>
                        <span>
                          <Typography className="signoPesos">$</Typography>
                          <TextField
                            variant="outlined"
                            className="inputPagos"
                            name="nuevoMonto"
                            color="secondary"
                            onChange={(e) =>
                              handleMontoChange(
                                pago._id, 
                                pago.id_alumno,
                                pago.fecha,
                                e.target.value
                              )
                            }
                          />
                          <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                          >
                            Enviar
                          </Button>
                        </span>
                      </form>
                    </TableCell>
                  ) : (
                    <TableCell>$ {pago.monto}</TableCell>
                  )}
                  <TableCell>
                    <Button
                      onClick={() => {
                        editarPago();
                      }}
                    >
                      <EditIcon color="secondary" />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        eliminarPago(pago._id);
                      }}
                    >
                      <HighlightOffIcon color="secondary" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>
                  <Typography>No se encontraron pagos para este mes</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default VerPagos;
