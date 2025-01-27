import { useContext } from "react";
import Home from "./Home";
import Loader from "../../../common/loader/Loader";
import { UserContext } from "../../../../context/UserContext";
import Forbidden from "../../forbidden/Forbidden";

const HomeContainer = () => {
  const { nombre, apellido, email, rolUsuario } = useContext(UserContext);
  return (
    <>
      {rolUsuario.length > 0 ? (  rolUsuario == "alumno" ? (
        email ? (
          <Home email={email} nombre={nombre} apellido={apellido} />
        ) : (
          <Loader />
        )
      ) : (
        <Forbidden />
      )) : (<Loader /> )
      
    }
    </>
  );
};

export default HomeContainer;
