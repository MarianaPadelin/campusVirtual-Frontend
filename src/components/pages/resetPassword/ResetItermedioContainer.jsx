import { useFormik } from "formik"
import ResetIntermedio from "./ResetIntermedio"
import axios from "axios";
import Swal from "sweetalert2";

const ResetItermedioContainer = () => {


    const { handleSubmit, handleChange } = useFormik({
        initialValues: {
            email: ""
        },
        onSubmit: async (datosIngresados) => {
            console.log(datosIngresados);
            let res = await axios.post("/email", datosIngresados)
            console.log(res);
            if(res.data.status === 200){
                Swal.fire({
                    icon:"success",
                    text:"Email enviado"
                })
            } else {
                Swal.fire({
                    icon: "error",
                    text: res.data.message
                })
            }

        }
    })


  return (
    <div><ResetIntermedio handleChange={handleChange} handleSubmit={handleSubmit}/> </div>
  )
}

export default ResetItermedioContainer