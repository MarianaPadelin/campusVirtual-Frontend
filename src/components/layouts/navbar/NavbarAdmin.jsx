import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";

const NavbarAdmin = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="secondary">
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
            Bienvenido Admin
          </Typography>
          <Link to="/admin/registro">
            <Button color="inherit">Registrar alumno</Button>
          </Link>
          <Link to="/admin/asistencias">
            <Button color="inherit">Asistencias</Button>
          </Link>
          <Link to="/admin/notas">
            <Button color="inherit">Subir notas</Button>
          </Link>
          <Link to="/admin/registro">
            <Button color="pagos">Subir pagos</Button>
          </Link>
          <Link to="/admin/material">
            <Button color="inherit">Subir material</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavbarAdmin;
