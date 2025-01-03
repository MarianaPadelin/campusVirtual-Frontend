import "./HomeAdmin.css"
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Button, Table, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { Link } from "react-router-dom";


const HomeAdmin = ({ alumnos }) => {
//eliminarElemento
  

  return (
    <div className="basicContainer">
        <Typography className="titles" variant="h4">Listado de alumnos</Typography>
        <Table>
            <TableHead>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Celular</TableCell>
              <TableCell>Editar</TableCell>
              <TableCell>Eliminar</TableCell>
            </TableHead>
            {alumnos &&
              alumnos.map((alumno) => (
                <TableRow key={alumno._id}>
                  <TableCell>{alumno.nombre}</TableCell>
                  <TableCell>{alumno.apellido}</TableCell>
                  <TableCell>{alumno.email}</TableCell>
                  <TableCell>{alumno.celular}</TableCell>
                  <TableCell>
                    <Link to={`info/${alumno._id}`}>
                      <Button color="secondary">
                        <EditIcon />
                      </Button>
                    </Link>
                  </TableCell>
                  <TableCell>
                    {/* <Button onClick={(eliminarElemento(alumno._id))}> */}
                    <Button color="secondary">
                      <HighlightOffIcon />
                    </Button>

                    {/* </Button> */}
                  </TableCell>
                </TableRow>
              ))}
    
        </Table>
      
    </div>
  );
};

export default HomeAdmin;
