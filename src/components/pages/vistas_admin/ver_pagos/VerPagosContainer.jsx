import { useEffect, useState } from "react";
import VerPagos from "./VerPagos";
import axios from "axios";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as Yup from "yup";

const VerPagosContainer = () => {
  const today = new Date();
  const year = today.getFullYear();
  const [año, setAño] = useState(year);
  const [mes, setMes] = useState("");
  const [pagos, setPagos] = useState([]);
  const [pagoEditor, setPagoEditor] = useState(false);
  const [nuevaInfo, setNuevaInfo] = useState({});

  const handleChangeAño = (e) => {
    const añoSeleccionado = e.target.value;
    setAño(añoSeleccionado);
  };

  const handleChangeMes = (date) => {
    setMes(date.month() + 1);
  };

  useEffect(() => {
    const promise = axios.get(`/pagos/mes/${mes}/${año}`);

    promise
      .then((res) => {
        return setPagos(res.data.pagos);
      })
      .catch((error) => {console.log(error)
         Swal.fire({
                    text: "Error del servidor",
                    icon: "error",
                  });
      });
  }, [mes, año]);

  const editarPago = () => {
    setPagoEditor(!pagoEditor);
  };

   const handleMontoChange = (idPago, idAlumno, fecha, valor) => {
     setNuevaInfo({
      _id: idPago, 
      id_alumno:idAlumno,
      fecha: fecha, 
      monto: valor
    });
   };
  const formik = useFormik({
    initialValues: {
      _id: "", 
      id_alumno: "",
      fecha: "",
      monto: 0,
    },
    onSubmit: async (datosIngresados, { resetForm }) => {
      datosIngresados._id = nuevaInfo._id;
      datosIngresados.id_alumno = nuevaInfo.id_alumno._id;
      datosIngresados.fecha = nuevaInfo.fecha;
      datosIngresados.monto = nuevaInfo.monto;

      if (datosIngresados.monto > 0) {
        const success = await actualizarPago(datosIngresados);
        if (success) {
          resetForm();
          // setMontoPorAlumno({}); // Clear the monto values
        }
      } else {
        Swal.fire({
          icon: "error",
          text: "Debe ingresar un valor mayor a cero",
        });
      }
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      monto: Yup.number()
        .typeError("Debe ser un número válido")
        .required("Monto es obligatorio"),
      // .moreThan(0, "Debe tener un valor mayor a cero"),
    }),
  });

 
  const actualizarPago = (data) => {
    axios
      .put(`/pagos/${data._id}`, data)
      .then((res) => {
        if(res.data.status === 200){
         return Swal.fire({
            icon: "success",
            text: res.data.message
          }).then(
            () => {
               const promise = axios.get(`/pagos/mes/${mes}/${año}`);

               promise
                 .then((res) => {
                  setPagoEditor(false)
                   return setPagos(res.data.pagos);
                 })
                 .catch((error) => {console.log(error)
                   Swal.fire({
                              text: "Error del servidor",
                              icon: "error",
                            });
                 });
            }
          )
        }
        return Swal.fire({
          icon: "error",
          text: res.data.message,
        });

      })
      .catch((err) => console.log(err));
  };
  const eliminarPago = (id) => {
    Swal.fire({
      title: "¿Seguro que desea eliminar el pago?",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const promise = axios.delete(`/pagos/${id}`, {
          withCredentials: true,
        });
        promise.then((res) => {
          if (res.data.status === 200) {
            return Swal.fire({
              icon: "success",
              text: res.data.message,
            }).then(() => {
              const promise = axios.get(`/pagos/mes/${mes}/${año}`);

              promise
                .then((res) => {
                  return setPagos(res.data.pagos);
                })
                .catch((error) => {console.log(error)
                   Swal.fire({
                              text: "Error del servidor",
                              icon: "error",
                            });
                });
            });
          }
          return Swal.fire({
            icon: "error",
            text: res.data.message,
          });
        }); //Swal pago eliminado
      }
    });
  };
  return (
    <>
      <VerPagos
        año={año}
        handleChangeAño={handleChangeAño}
        handleChangeMes={handleChangeMes}
        pagos={pagos}
        editarPago={editarPago}
        eliminarPago={eliminarPago}
        pagoEditor={pagoEditor}
        handleMontoChange={handleMontoChange}
        formik={formik}
        year={year}
      />
    </>
  );
};

export default VerPagosContainer;
