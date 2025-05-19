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
import DownloadIcon from "@mui/icons-material/Download";
import { Link } from "react-router-dom";

const VerTps = ({ tpList }) => {
  console.log(tpList)
  return (
    <div className="basicContainer">
      <Typography className="titles" variant="h3">
        Lista de trabajos prácticos
      </Typography>

      <div className="secondaryContainer">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Clase</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Alumno</TableCell>
              <TableCell>Archivo</TableCell>
              <TableCell>Nota</TableCell>
              <TableCell>Devolución</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tpList.length > 0 ? (
              tpList.map((tp) => (
                <TableRow key={tp._id}>
                  <TableCell>{tp.clase}</TableCell>
                  <TableCell>{tp.fecha}</TableCell>
                  <TableCell>
                    {tp.idAlumno.nombre} {tp.idAlumno.apellido}
                  </TableCell>
                  <TableCell>
                    <Link to={tp.url} target="_blank">
                      <span className="spanArchivos">
                        {tp.nombre} <DownloadIcon />
                      </span>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <TextField variant="outlined"></TextField>
                  </TableCell>
                  <TableCell>
                    <TextField variant="outlined" multiline></TextField>
                  </TableCell>
                  <TableCell>
                    <Button variant="contained">ENVIAR</Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6}>
                  No hay trabajos prácticos para mostrar
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default VerTps;
