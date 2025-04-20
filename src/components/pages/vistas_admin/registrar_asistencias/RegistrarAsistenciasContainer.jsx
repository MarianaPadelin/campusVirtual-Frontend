import { useEffect, useState } from "react";
import RegistrarAsistencias from "./RegistrarAsistencias";
import axios from "axios";
import { useFormik } from "formik";
import dayjs from "dayjs";
import Swal from "sweetalert2";

const RegistrarAsistenciasContainer = () => {
  const today = new Date();
  const year = today.getFullYear();
  const [clase, setClase] = useState("");
  const [clasesDisponibles, setClasesDisponibles] = useState([]);
  const [alumnos, setAlumnos] = useState([]);
  const [asistencias, setAsistencias] = useState([]);
  const [año, setAño] = useState(year);
  const [fecha, setFecha] = useState("");
  const [fechaSinFormato, setFechaSinFormato] = useState("");
  const [listaAsistencias, setListaAsistencias] = useState([]);

  useEffect(() => {
    const promise = axios.get(`/clases`);
    promise
      .then((res) => setClasesDisponibles(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleChangeClases = (e) => {
    const claseSeleccionada = e.target.value;
    setClase(claseSeleccionada);
  };

  const handleChangeAño = (date) => {
    if (date) {
      const añoSeleccionado = dayjs(date).year();
      const fechaFormateada = dayjs(date).format("DD/MM/YYYY"); // Format the date as dd/mm/yyyy

      setAño(añoSeleccionado);

      setFecha(fechaFormateada);
      setFechaSinFormato(date);
      // console.log(fechaFormateada);
    }
  };

  // useEffect(() => {

  //   // acá tendría que buscar si hay asistencias, y sino poner la lista de alumnos
  //   const promise = axios.get(`/clases/admin/${clase}/${año}`);
  //   promise
  //     .then((res) => {
  //       if (res.data.status == 404) {
  //         setAlumnos([]);
  //       }
  //       setAlumnos(res.data.result);
  //     })
  //     .catch((err) => console.log(err));
  // }, [clase, año]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `/asistencias/${clase}/'${fechaSinFormato}'`
        );
        if (res.data.response.length > 0) {
          return setAsistencias(res.data.response);
        } else {
          setAsistencias([]);
          const res = await axios.get(`/clases/admin/${clase}/${año}`);
          if (res.data.status == 404) {
            return setAlumnos([]);
          }
          return setAlumnos(res.data.result);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [clase, fechaSinFormato, año]);

  const { handleSubmit, values, errors } = useFormik({
    initialValues: {
      clase: "",
      fecha: "",
    },
    onSubmit: () => {
      // datosIngresados.clase = clase;
      // datosIngresados.fecha = fecha;
      // console.log(datosIngresados);
      // registrarAsistencias(datosIngresados);

      const asistencias = listaAsistencias.map((entry) => ({
        ...entry,
        clase,
        fecha,
      }));

      registrarAsistencias(asistencias);
    },
  });

  //Falta restar las faltas disponibles de la clase
  const handleSelectAsistencia = (id_alumno, asistencia) => {
    setListaAsistencias((prevLista) => {
      const index = prevLista.findIndex(
        (entry) => entry.id_alumno === id_alumno
      );
      if (index > -1) {
        // Update existing entry
        const updatedLista = [...prevLista];
        updatedLista[index].asistencia = asistencia;
        return updatedLista;
      } else {
        // Add new entry
        return [...prevLista, { id_alumno, asistencia }];
      }
    });
  };

  const registrarAsistencias = (data) => {
    const promise = axios.post("/asistencias", { data });

    promise
      .then((res) => {
        if (res.data.status === 200) {
          Swal.fire({
            icon: "success",
            text: "Asistencias registradas con éxito",
            timer: 1500,
          }).then(window.location.reload());

          return;
        }
        return Swal.fire({
          icon: "error",
          text: "Error desconocido",
          timer: 1500,
        });
      })

      .catch((err) => console.log("Hubo un error: " + err));
  };

  return (
    <div>
      <RegistrarAsistencias
        clase={clase}
        año={año}
        clasesDisponibles={clasesDisponibles}
        alumnos={alumnos}
        handleChangeClases={handleChangeClases}
        handleChangeAño={handleChangeAño}
        // handleChange={handleChange}
        // handleSelectStudent={handleSelectStudent}
        handleSelectAsistencia={handleSelectAsistencia}
        handleSubmit={handleSubmit}
        values={values}
        errors={errors}
        asistencias={asistencias}
      />
    </div>
  );
};

export default RegistrarAsistenciasContainer;

