import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const TpAlumno = ({ handleChange, handleSubmit, handleTpId, errors, tpList, alumno, clase, year}) => {
  return (
    <div className="secondaryContainer">
      <Typography className="titles" variant="h3">
        Trabajos prácticos de {alumno}
      </Typography>
      <Typography className="titles" variant="h4">
        {clase} {year}
      </Typography>
      <form className="tablaMaterial" onSubmit={handleSubmit}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Fecha</TableCell>
              <TableCell>Archivo</TableCell>
              <TableCell>Ver archivo</TableCell>
              <TableCell>Nota</TableCell>
              <TableCell>Devolución</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tpList && tpList.length > 0 ? (
              tpList.map((tp) => (
                <TableRow key={tp._id} onClick={() => handleTpId(tp._id)}>
                  <TableCell>{tp.fecha}</TableCell>
                  <TableCell> {tp.nombre}</TableCell>
                  <TableCell>
                    <Link to={tp.url} target="_blank">
                      <Button variant="outlined">Ver TP</Button>
                    </Link>
                  </TableCell>
                  {tp.nota ? (
                    <TableCell>{tp.nota}</TableCell>
                  ) : (
                    <TableCell>
                      <TextField
                        variant="outlined"
                        className="inputPagos"
                        name="notaTP"
                        onChange={handleChange}
                        error={errors.notaTP ? true : false}
                        helperText={errors.notaTP}
                      ></TextField>
                    </TableCell>
                  )}
                  {tp.devolucion ? (
                    <TableCell>
                      <Box className="devoluciones">{tp.devolucion}</Box>
                    </TableCell>
                  ) : (
                    <TableCell>
                      <TextField
                        variant="outlined"
                        multiline
                        className="devoluciones"
                        name="devolucionTP"
                        onChange={handleChange}
                        error={errors.devolucionTP ? true : false}
                        helperText={errors.devolucionTP}
                      ></TextField>
                    </TableCell>
                  )}
                  {tp.nota ? (
                    <TableCell></TableCell>
                  ) : (
                    <TableCell>
                      <Button
                        variant="contained"
                        className="buttonForm"
                        type="submit"
                        title="Confirmar nota"
                      >
                        ENVIAR
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8}>
                  No hay trabajos prácticos para mostrar
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </form>
      <Link to="/admin/tps">
        <Button className="buttonWithMargin" variant="outlined">
          Volver
        </Button>
      </Link>
    </div>
  );
}

export default TpAlumno