import Tp from "./Tp"
import { useContext } from "react";

import { UserContext } from "../../../../context/UserContext";
import Forbidden from "../../forbidden/Forbidden";
const TpContainer = () => {
    const { rolUsuario } = useContext(UserContext)
  
  return (
    <>
      {rolUsuario == "alumno" ? <Tp /> : <Forbidden />}

    </>
  );
}

export default TpContainer