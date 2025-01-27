import { useContext, useEffect, useState } from "react";
import RegistrarAsistencias from "./RegistrarAsistencias";
import axios from "axios";
import { useFormik } from "formik";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { UserContext } from "../../../../context/UserContext";
import Forbidden from "../../forbidden/Forbidden";


const RegistrarAsistenciasContainer = () => {
    const { rolUsuario } = useContext(UserContext);
  
  const [clase, setClase] = useState("");
  const [clasesDisponibles, setClasesDisponibles] = useState([]);
  const [alumnos, setAlumnos] = useState([]);
  const [año, setAño] = useState(2025); //Esto agarrarlo del datePicker
  const [fecha, setFecha] = useState("");
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
      // console.log(fechaFormateada);
    }
  };

  useEffect(() => {
    // console.log(clase, año);
    const promise = axios.get(`/clases/${clase}/${año}`);
    promise
      .then((res) => {
        if (res.data.status == 404) {
          setAlumnos([]);
        }
        setAlumnos(res.data.result);
      })
      .catch((err) => console.log(err));
  }, [clase, año]);

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
          });
          setListaAsistencias([]); // Clear the list after submission, no anda
          return;
        }
        return Swal.fire({
          icon: "error",
          text: "Error desconocido",
        });
      })

      .catch((err) => console.log("Hubo un error: " + err));
  };

  return (
    <div>
      { rolUsuario == "admin" ? ( <RegistrarAsistencias
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
      />) : (
        <Forbidden />
      ) }

     
    </div>
  );
};

export default RegistrarAsistenciasContainer;




// ---------------Frontend
// import React, { useState } from "react";
// import { useFormik } from "formik";
// import axios from "axios";
// import Swal from "sweetalert2";

// function AssistanceForm() {
//   const [asistencias, setAsistencias] = useState([]); // Array to store assistance records

//   const { handleSubmit, values, setFieldValue, errors } = useFormik({
//     initialValues: {
//       clase: "",
//       fecha: "",
//       id_alumno: "",
//       asistencia: false,
//     },
//     onSubmit: () => {
//       registrarAsistencias(asistencias); // Send the array of assistance records
//     },
//   });

//   // Handle adding assistance for one student
//   const handleAddAsistencia = () => {
//     const nuevaAsistencia = {
//       clase: values.clase,
//       fecha: values.fecha,
//       id_alumno: values.id_alumno,
//       asistencia: values.asistencia,
//     };

//     setAsistencias([...asistencias, nuevaAsistencia]); // Add the new record to the array
//     console.log("Asistencias acumuladas:", [...asistencias, nuevaAsistencia]);



//   const handleSelectStudent = (alumnoId) => {
//     setFieldValue("id_alumno", alumnoId);
//   };

//   const handleSelectAsistencia = (e) => {
//     const isChecked = e.target.checked;
//     setFieldValue("asistencia", isChecked);
//   };

//   const registrarAsistencias = (data) => {
//     axios
//       .post("/asistencias", data) // Send the array of assistance records
//       .then((res) => {
//         if (res.data.status === 200) {
//           Swal.fire({
//             icon: "success",
//             text: "Asistencias registradas con éxito",
//           });
//           setAsistencias([]); // Clear the array after a successful upload
//         } else {
//           Swal.fire({
//             icon: "error",
//             text: "Error desconocido",
//           });
//         }
//       })
//       .catch((err) => console.log("Hubo un error: " + err));
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Clase:</label>
//           <input
//             type="text"
//             value={values.clase}
//             onChange={(e) => setFieldValue("clase", e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Fecha:</label>
//           <input
//             type="date"
//             value={values.fecha}
//             onChange={(e) => setFieldValue("fecha", e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Estudiante:</label>
//           <select onChange={(e) => handleSelectStudent(e.target.value)}>
//             <option value="">Seleccione un estudiante</option>
//             <option value="student1">Estudiante 1</option>
//             <option value="student2">Estudiante 2</option>
//           </select>
//         </div>
//         <div>
//           <label>Asistencia:</label>
//           <input
//             type="checkbox"
//             checked={values.asistencia}
//             onChange={handleSelectAsistencia}
//           />
//         </div>
//         <button type="button" onClick={handleAddAsistencia}>
//           Agregar Asistencia
//         </button>
//         <button type="submit">Registrar Asistencias</button>
//       </form>

//       <h3>Asistencias para enviar:</h3>
//       <ul>
//         {asistencias.map((asistencia, index) => (
//           <li key={index}>
//             {asistencia.id_alumno} - {asistencia.fecha} -{" "}
//             {asistencia.asistencia ? "Presente" : "Ausente"}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default AssistanceForm;
