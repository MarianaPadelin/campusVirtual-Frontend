import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import axios from "axios";

const pages = [
  { name: "Home", path: "/alumnos" },
  { name: "Notas", path: "/alumnos/notas" },
  { name: "Asistencias", path: "/alumnos/asistencias" },
  { name: "Pagos", path: "/alumnos/pagos" },
  { name: "Trabajos prácticos", path: "/alumnos/tp" },
  { name: "Ver material didáctico", path: "/alumnos/material" },
  { name: "Ver certificado", path: "/alumnos/certificado" },
];

const NavbarAlumnos = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (e) => {
    setAnchorElNav(e.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const logout = async () => {
    try {
      const res = await axios.get("/session/logout", {
        withCredentials: true,
      });
      if (res.status == 200) {
        return navigate("/");
      }
      return alert("No se pudo cerrar la sesión");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/alumnos">
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              className="linkNavbar"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontWeight: 700,
              }}
            >
              <img
                className="logo"
                title="Home"
                alt="logo"
                src="https://res.cloudinary.com/dvxkjikvk/image/upload/v1740657523/campus/WhatsApp_Image_2025-02-26_at_11.12.53_qcvusd.jpg"
              />
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              // size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name}>
                  <Link to={page.path}>
                    <Typography
                      sx={{ textAlign: "center" }}
                      onClick={handleCloseNavMenu}
                    >
                      {page.name}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
              <MenuItem>
                <Link>
                  <Button className="navbarButton" onClick={logout}>
                    Cerrar Sesión
                  </Button>
                </Link>
              </MenuItem>
            </Menu>
          </Box>
          <Link to="/alumnos">
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 4,
                display: { xs: "flex", md: "none" },
              }}
            >
              <img
                className="logoMovil"
                title="Home"
                alt="logo"
                src="https://res.cloudinary.com/dvxkjikvk/image/upload/v1740657523/campus/WhatsApp_Image_2025-02-26_at_11.12.53_qcvusd.jpg"
              />
            </Typography>
          </Link>

          <Box sx={{ justifyContent:"space-evenly", flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Link key={page.name} title={page.name} to={page.path} className="linkNavbar">
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.name}
                </Button>
              </Link>
            ))}
            <Link className="linkNavbar">
              <Button className="navbarButton" onClick={logout}>
                <Typography className="cerrarSesion"> Cerrar sesión</Typography>
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavbarAlumnos;
