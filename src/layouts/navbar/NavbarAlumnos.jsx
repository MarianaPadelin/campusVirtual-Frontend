import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";

const NavbarAlumnos = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Bienvenido Alumno
          </Typography>
          <Link to="/alumnos/notas">
            <Button color="inherit">Notas</Button>
          </Link>
          <Link to="/alumnos/asistencias">
            <Button color="inherit">Asistencias</Button>
          </Link>

          <Link to="/alumnos/pagos">
            <Button color="inherit">Pagos</Button>
          </Link>

          <Link to="/alumnos/tp">
            <Button color="inherit">Trabajos Prácticos</Button>
          </Link>
          <Link to="/alumnos/material">
            <Button color="inherit">Ver material didáctico</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavbarAlumnos;
