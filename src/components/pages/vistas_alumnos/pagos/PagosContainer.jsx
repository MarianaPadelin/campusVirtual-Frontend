import { useContext, useEffect, useState } from "react"
import Pagos from "./Pagos"
import { UserContext } from "../../../../context/UserContext"
import Forbidden from "../../forbidden/Forbidden"
import Loader from "../../../common/loader/Loader"
import axios from "axios"

const PagosContainer = () => {
  const { rolUsuario, id } = useContext(UserContext)
  const [pagos, setPagos] = useState([])


  useEffect(() => {
    const promise = axios.get(`/pagos/${id}`)

    promise.then((res) => {setPagos(res.data.pagos)}).catch((err) => {console.error("Hubo un error: ", err)})
  }
  )


  return (
    <>
    { rolUsuario.length > 0 ? (rolUsuario == "alumno" ? ( <Pagos pagos={pagos}/>) : (<Forbidden />))  : (<Loader /> )
    
    }
   </>
  )
}

export default PagosContainer