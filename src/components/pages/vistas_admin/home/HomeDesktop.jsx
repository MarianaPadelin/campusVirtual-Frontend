import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";
const HomeDesktop = ({ alumnos, eliminarElemento }) => {
  return (
    <div className="basicContainer">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Apellido</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Celular</TableCell>
            <TableCell>Detalles</TableCell>
            <TableCell>Eliminar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {alumnos.length > 0 ? (
            alumnos.map((alumno) => (
              <TableRow key={alumno._id}>
                <TableCell>{alumno.nombre}</TableCell>
                <TableCell>{alumno.apellido}</TableCell>
                <TableCell>{alumno.email}</TableCell>
                <TableCell>{alumno.celular}</TableCell>
                <TableCell>
                  <Link to={`info/${alumno._id}`}>
                    <Button>
                      <PersonSearchIcon />
                    </Button>
                  </Link>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      eliminarElemento(alumno._id, alumno.email);
                    }}
                  >
                    <HighlightOffIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6}>No hay alumnos registrados </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default HomeDesktop;
