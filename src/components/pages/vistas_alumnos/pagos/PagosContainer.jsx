import { useContext, useEffect, useState } from "react";
import Pagos from "./Pagos";
import { UserContext } from "../../../../context/UserContext";
import axios from "axios";
import Loader from "../../../common/loader/Loader";

const PagosContainer = () => {
  const { id } = useContext(UserContext);
  const [pagos, setPagos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/pagos/${id}`);
        if (res.data.status === 200) {
          return setPagos(res.data.pagos);
        }
        return setPagos([]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return <>{loading ? <Loader /> : <Pagos pagos={pagos} />}</>;
};

export default PagosContainer;
