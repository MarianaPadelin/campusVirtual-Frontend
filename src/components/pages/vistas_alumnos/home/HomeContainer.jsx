import { useContext } from "react";
import Home from "./Home";
import Loader from "../../../common/loader/Loader";
import { UserContext } from "../../../../context/UserContext";

const HomeContainer = () => {
  const { nombre, apellido, email } = useContext(UserContext);
  return (
    <>
      {email ? (
        <Home email={email} nombre={nombre} apellido={apellido} />
      ) : (
        <Loader />
      )}
    </>
  );
};

export default HomeContainer;
