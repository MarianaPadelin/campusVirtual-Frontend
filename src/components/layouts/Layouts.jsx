import { Outlet, useLocation } from "react-router-dom"
// Outlet renderiza los children de navbar
import NavbarAlumnos from "./navbar/NavbarAlumnos";
import NavbarAdmin from "./navbar/NavbarAdmin";
// import Footer from "./navbar/Footer";

const Layouts = () => {
  let location = useLocation();
  let url = (location.pathname);
 
  return (
    <>
      {url.includes("admin") ? <NavbarAdmin /> : <NavbarAlumnos />}

      <Outlet />

      {/* <Footer /> */}
    </>
  );
}

export default Layouts