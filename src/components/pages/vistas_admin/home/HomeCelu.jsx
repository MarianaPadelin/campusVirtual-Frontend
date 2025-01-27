import EditIcon from "@mui/icons-material/Edit";
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
const HomeCelu = ({ alumnos, eliminarElemento }) => {
  return (
    <div className="basicContainer">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Apellido</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Eliminar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {alumnos &&
            alumnos.map((alumno) => (
              <TableRow key={alumno._id}>
                <TableCell>{alumno.apellido}</TableCell>

                <TableCell>
                  <Link to={`info/${alumno._id}`}>
                    <Button color="secondary">
                      <EditIcon />
                    </Button>
                  </Link>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      eliminarElemento(alumno._id);
                    }}
                  >
                    <HighlightOffIcon color="secondary" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default HomeCelu;
