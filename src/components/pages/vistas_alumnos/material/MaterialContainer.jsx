import { useContext } from "react"
import Material from "./Material"
import { UserContext } from "../../../../context/UserContext"
import Forbidden from "../../forbidden/Forbidden"

const MaterialContainer = () => {

  const { rolUsuario } = useContext(UserContext)
  return <>{rolUsuario == "alumno" ? <Material /> : <Forbidden />}</>;
}

export default MaterialContainer