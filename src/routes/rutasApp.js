// import Muestra from "../components/pages/muestra_2vistas/Muestra";
// import LoginContainer from "../components/pages/login/LoginContainer";
// import RegisterContainer from "../components/pages/register/RegisterContainer";
import AgregarClaseContainer from "../components/pages/vistas_admin/agregar_clase/AgregarClaseContainer";
import CargarAlumnosContainer from "../components/pages/vistas_admin/cargar_alumnos/CargarAlumnosContainer";
import CargarCertificadosContainer from "../components/pages/vistas_admin/cargar_certificados/CargarCertificadosContainer";
import CargarMaterialContainer from "../components/pages/vistas_admin/cargar_material/CargarMaterialContainer";
import HistorialContainer from "../components/pages/vistas_admin/historial_pagos/HistorialContainer";
import HomeAdminContainer from "../components/pages/vistas_admin/home/HomeAdminContainer";
import InfoContainer from "../components/pages/vistas_admin/info_alumno/InfoContainer";
import RegistroContainer from "../components/pages/vistas_admin/registrar_alumno/RegistroContainer";
import RegistrarAsistenciasContainer from "../components/pages/vistas_admin/registrar_asistencias/RegistrarAsistenciasContainer";
import RegistrarNotasContainer from "../components/pages/vistas_admin/registrar_notas/RegistrarNotasContainer";
import RegistrarPagosContainer from "../components/pages/vistas_admin/registrar_pagos/RegistrarPagosContainer";
import VerPagosContainer from "../components/pages/vistas_admin/ver_pagos/VerPagosContainer";
import TpAlumnoContainer from "../components/pages/vistas_admin/ver_tps/TpAlumnoContainer";
import VerTpsContainer from "../components/pages/vistas_admin/ver_tps/VerTpsContainer";
import AsistenciasContainer from "../components/pages/vistas_alumnos/asistencias/AsistenciasContainer";
import Calendario from "../components/pages/vistas_alumnos/calendario/Calendario";
import CertificadosContainer from "../components/pages/vistas_alumnos/certificados/CertificadosContainer";
import HomeContainer from "../components/pages/vistas_alumnos/home/HomeContainer";
import MaterialContainer from "../components/pages/vistas_alumnos/material/MaterialContainer";
import MateriasContainer from "../components/pages/vistas_alumnos/materias/MateriasContainer";
import NotasContainer from "../components/pages/vistas_alumnos/notas/NotasContainer";
import PagosContainer from "../components/pages/vistas_alumnos/pagos/PagosContainer";
import TpContainer from "../components/pages/vistas_alumnos/tp/TpContainer";

export const rutasApp = [
  //---Alumnos---
  {
    id: "home",
    path: "/alumnos",
    Element: HomeContainer,
    role: "alumno",
  },
  {
    id: "calendario",
    path: "/alumnos/calendario",
    Element: Calendario,
    role: "alumno",
  },
  {
    id: "notas",
    path: "/alumnos/notas",
    Element: NotasContainer,
    role: "alumno",
  },
  {
    id: "material",
    path: "/alumnos/material",
    Element: MaterialContainer,
    role: "alumno",
  },
  {
    id: "pagos",
    path: "/alumnos/pagos",
    Element: PagosContainer,
    role: "alumno",
  },
  {
    id: "asistencias",
    path: "/alumnos/asistencias",
    Element: AsistenciasContainer,
    role: "alumno",
  },
  {
    id: "tp",
    path: "/alumnos/tp",
    Element: TpContainer,
    role: "alumno",
  },
  {
    id: "certificado",
    path: "/alumnos/certificado",
    Element: CertificadosContainer,
    role: "alumno",
  },
  {
    id: "materias",
    path: "/alumnos/materias",
    Element: MateriasContainer,
    role: "alumno",
  },
  //---Admin---
  {
    id: "homeAdmin",
    path: "/admin",
    Element: HomeAdminContainer,
    role: "admin",
  },
  {
    id: "cargar_material",
    path: "/admin/material",
    Element: CargarMaterialContainer,
    role: "admin",
  },
  {
    id: "info",
    path: "/admin/info/:id",
    Element: InfoContainer,
    role: "admin",
  },
  {
    id: "historial",
    path: "/admin/historial/:id",
    Element: HistorialContainer,
    role: "admin",
  },

  {
    id: "registro",
    path: "/admin/registro",
    Element: RegistroContainer,
    role: "admin",
  },
  {
    id: "registroAsistencias",
    path: "/admin/asistencias",
    Element: RegistrarAsistenciasContainer,
    role: "admin",
  },
  {
    id: "clases",
    path: "/admin/clases",
    Element: AgregarClaseContainer,
    role: "admin",
  },
  {
    id: "registroNotas",
    path: "/admin/notas",
    Element: RegistrarNotasContainer,
    role: "admin",
  },
  {
    id: "registroPagos",
    path: "/admin/pagos",
    Element: RegistrarPagosContainer,
    role: "admin",
  },
  {
    id: "verPagos",
    path: "/admin/pagosMensuales",
    Element: VerPagosContainer,
    role: "admin",
  },
  {
    id: "verTps",
    path: "/admin/tps",
    Element: VerTpsContainer,
    role: "admin",
  },
  {
    id: "tpAlumno",
    path: "/admin/tps/:id/:clase/:year",
    Element: TpAlumnoContainer,
    role: "admin",
  },
  {
    id: "cargarAlumnos",
    path: "/admin/lista",
    Element: CargarAlumnosContainer,
    role: "admin",
  },
  {
    id: "subirCertificados",
    path: "/admin/certificados",
    Element: CargarCertificadosContainer,
    role: "admin",
  },
];
