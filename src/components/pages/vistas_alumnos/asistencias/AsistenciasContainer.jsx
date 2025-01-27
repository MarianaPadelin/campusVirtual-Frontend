import { useContext } from "react";
import Asistencias from "./Asistencias";
import { UserContext } from "../../../../context/UserContext";
import Forbidden from "../../forbidden/Forbidden";

const AsistenciasContainer = () => {
  const { rolUsuario } = useContext(UserContext);
  return <>{rolUsuario == "alumno" ? <Asistencias /> : <Forbidden />}</>;
};

export default AsistenciasContainer;
