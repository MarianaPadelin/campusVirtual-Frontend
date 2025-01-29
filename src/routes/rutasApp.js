// import Muestra from "../components/pages/muestra_2vistas/Muestra";
// import LoginContainer from "../components/pages/login/LoginContainer";
// import RegisterContainer from "../components/pages/register/RegisterContainer";
import AgregarClaseContainer from "../components/pages/vistas_admin/agregar_clase/AgregarClaseContainer";
import CargarAlumnosContainer from "../components/pages/vistas_admin/cargar_alumnos/CargarAlumnosContainer";
import CargarMaterialContainer from "../components/pages/vistas_admin/cargar_material/CargarMaterialContainer";
import HomeAdminContainer from "../components/pages/vistas_admin/home/HomeAdminContainer";
import InfoContainer from "../components/pages/vistas_admin/info_alumno/InfoContainer";
import RegistroContainer from "../components/pages/vistas_admin/registrar_alumno/RegistroContainer";
import RegistrarAsistenciasContainer from "../components/pages/vistas_admin/registrar_asistencias/RegistrarAsistenciasContainer";
import RegistrarNotasContainer from "../components/pages/vistas_admin/registrar_notas/RegistrarNotasContainer";
import RegistrarPagosContainer from "../components/pages/vistas_admin/registrar_pagos/RegistrarPagosContainer";
import AsistenciasContainer from "../components/pages/vistas_alumnos/asistencias/AsistenciasContainer";
import HomeContainer from "../components/pages/vistas_alumnos/home/HomeContainer";
import MaterialContainer from "../components/pages/vistas_alumnos/material/MaterialContainer";
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
    id: "cargarAlumnos",
    path: "/admin/lista",
    Element: CargarAlumnosContainer,
    role: "admin",
  },
];
