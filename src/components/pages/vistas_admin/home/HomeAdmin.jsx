import "./HomeAdmin.css"
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";


const HomeAdmin = ({ alumnos, eliminarElemento }) => {

  

  return (
    <div className="basicContainer">
      <>
        <table>
          <tbody>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Celular</th>
            </tr>
            {alumnos && alumnos.map((alumno) => (
              <tr key={alumno._id}>
                <td>{alumno.nombre}</td>
                <td>{alumno.apellido}</td>
                <td>{alumno.email}</td>
                <td>{alumno.celular}</td>
                <td>
                  <Link to={`info/${alumno._id}`}>
                    <Button>
                      <EditIcon />
                    </Button>
                  </Link>
                </td>
                <td>
                  <Button onClick={eliminarElemento}>
                    <HighlightOffIcon />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    </div>
  );
};

export default HomeAdmin;
