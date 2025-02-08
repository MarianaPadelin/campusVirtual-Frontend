import { useFormik } from "formik";
import ResetIntermedio from "./ResetIntermedio";
import axios from "axios";
import Swal from "sweetalert2";

const ResetItermedioContainer = () => {
  const { handleSubmit, handleChange } = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async (datosIngresados) => {
      Swal.fire({
        imageUrl:
          "https://res.cloudinary.com/dvxkjikvk/image/upload/v1738096102/campus/ZKZg_fvg2mn.gif",
        imageWidth: 100,
        imageHeight: 100,
        imageAlt: "Cargando",
        text: "Enviando...",
        showConfirmButton: false,
      });
      let res = await axios.post("/email", datosIngresados);
      console.log(res);
      if (res.data.status === 200) {
        Swal.fire({
          icon: "success",
          text: "Email enviado",
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "error",
          text: res.data.message,
          timer: 1500,
        });
      }
    },
  });

  return (
    <div>
      <ResetIntermedio
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />{" "}
    </div>
  );
};

export default ResetItermedioContainer;
