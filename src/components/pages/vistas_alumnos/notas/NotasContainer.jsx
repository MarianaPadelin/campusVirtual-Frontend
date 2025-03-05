import { useContext, useEffect, useState } from "react";
import Notas from "./Notas";
import axios from "axios";
// import Loader from "../../../common/loader/Loader";
import { UserContext } from "../../../../context/UserContext";
import Loader from "../../../common/loader/Loader";
import Swal from "sweetalert2";

const NotasContainer = () => {
  const today = new Date();
  const year = today.getFullYear();
  const [notas, setNotas] = useState([]);
  const [año, setAño] = useState(year);
  const [loading, setLoading] = useState(true);

  const { id } = useContext(UserContext);

  const handleChangeAño = (e) => {
    const añoSeleccionado = e.target.value;
    setAño(añoSeleccionado);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/alumnos/${id}/notas/${año}`, {
          withCredentials: true,
        });
        if (res.data.status == 404) {
          setNotas([]);
        }
        setNotas(res.data.result);
      } catch (error) {
        console.log(error);
         Swal.fire({
                    text: "Error del servidor",
                    icon: "error",
                  });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, año]);

  return (
    <>
    {loading ? (
        <Loader />
      ) : (
      <Notas notas={notas} año={año} handleChangeAño={handleChangeAño} year={year} />
      )}</>
  );
};

export default NotasContainer;
