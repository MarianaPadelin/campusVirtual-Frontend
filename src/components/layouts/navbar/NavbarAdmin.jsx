import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
// import Avatar from "@mui/material/Avatar";
// import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
// import AdbIcon from "@mui/icons-material/Adb";
import { useState } from "react";

const pages = [
  { name: "Registrar alumno", path: "/admin/registro" },
  { name: "Cargar alumnos", path: "/admin/lista" },
  { name: "Asistencias", path: "/admin/asistencias" },
  { name: "Subir notas", path: "/admin/notas" },
  { name: "Subir pagos", path: "/admin/pagos" },
  { name: "Subir material", path: "/admin/material" },
  { name: "Cerrar sesión", path: "/logout" },
];
// const settings = ["Profile", "Account", "Dashboard", "Logout"];
const NavbarAdmin = () => {
    const [anchorElNav, setAnchorElNav] =useState(null)
    // const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (e) => {
      setAnchorElNav(e.currentTarget);
    };
    // const handleOpenUserMenu = (e) => {
    //   setAnchorElUser(e.currentTarget);
    // };

    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
      
    };

    // const handleCloseUserMenu = () => {
    //   setAnchorElUser(null);
    // };

  return (
    <AppBar color="secondary" position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/admin">
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontWeight: 700,
              }}
            >
              CIRCO DE LAS ARTES
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
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
            </Menu>
          </Box>
          <Link to="/admin">
            {" "}
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
              CIRCO DE LAS ARTES
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Link key={page.name} to={page.path}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.name}
                </Button>
              </Link>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {/* <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip> */}
            {/* <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: "center" }}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu> */}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    // <Box sx={{ flexGrow: 1 }}>
    //   <AppBar position="static" color="secondary">
    //     <Toolbar>
    //       {/* <IconButton
    //         size="large"
    //         edge="start"
    //         color="inherit"
    //         aria-label="menu"
    //         sx={{ mr: 2 }}
    //       >
    //         <MenuIcon />
    //       </IconButton> */}
    //       <Link to="/admin">
    //         <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
    //           Bienvenido Admin
    //         </Typography>
    //       </Link>

    //       <Link to="/admin/registro">
    //         <Button color="inherit">Registrar alumno</Button>
    //       </Link>
    //       <Link to="/admin/asistencias">
    //         <Button color="inherit">Asistencias</Button>
    //       </Link>
    //       <Link to="/admin/notas">
    //         <Button color="inherit">Subir notas</Button>
    //       </Link>
    //       <Link to="/admin/pagos">
    //         <Button color="pagos">Subir pagos</Button>
    //       </Link>
    //       <Link to="/admin/material">
    //         <Button color="inherit">Subir material</Button>
    //       </Link>
    //     </Toolbar>
    //   </AppBar>
    // </Box>
  );
};

export default NavbarAdmin;
