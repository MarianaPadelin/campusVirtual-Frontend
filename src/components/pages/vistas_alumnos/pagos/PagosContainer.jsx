import { useContext, useEffect, useState } from "react";
import Pagos from "./Pagos";
import { UserContext } from "../../../../context/UserContext";
import axios from "axios";

const PagosContainer = () => {
  const {  id } = useContext(UserContext);
  const [pagos, setPagos] = useState([]);

  useEffect(() => {
    const promise = axios.get(`/pagos/${id}`);

    promise
      .then((res) => {
        setPagos(res.data.pagos);
      })
      .catch((err) => {
        console.error("Hubo un error: ", err);
      });
  }, []);

  return (
    <>
          <Pagos pagos={pagos} />
    </>
  );
};

export default PagosContainer;
