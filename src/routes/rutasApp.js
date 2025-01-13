// import Muestra from "../components/pages/muestra_2vistas/Muestra";
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
  },
  {
    id: "notas",
    path: "/alumnos/notas",
    Element: NotasContainer,
  },
  {
    id: "material",
    path: "/alumnos/material",
    Element: MaterialContainer,
  },
  {
    id: "pagos",
    path: "/alumnos/pagos",
    Element: PagosContainer,
  },
  {
    id: "asistencias",
    path: "/alumnos/asistencias",
    Element: AsistenciasContainer,
  },
  {
    id: "tp",
    path: "/alumnos/tp",
    Element: TpContainer,
  },
  //---Admin---
  {
    id: "homeAdmin",
    path: "/admin",
    Element: HomeAdminContainer,
  },
  {
    id: "cargar_material",
    path: "/admin/material",
    Element: CargarMaterialContainer,
  },
  {
    id: "info",
    path: "/admin/info/:id",
    Element: InfoContainer,
  },
  {
    id: "registro",
    path: "/admin/registro",
    Element: RegistroContainer,
  },
  {
    id: "registroAsistencias",
    path: "/admin/asistencias",
    Element: RegistrarAsistenciasContainer,
  },
  {
    id: "registroNotas",
    path: "/admin/notas",
    Element: RegistrarNotasContainer,
  },
  {
    id: "registroPagos",
    path: "/admin/pagos",
    Element: RegistrarPagosContainer,
  },
  {
    id: "cargarAlumnos",
    path: "/admin/lista",
    Element: CargarAlumnosContainer,
  },
];
