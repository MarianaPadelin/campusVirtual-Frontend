import { useEffect, useState } from "react";
import CargarMaterial from "./CargarMaterial";
import axios from "axios";


//contenido en user.controller de marga
const CargarMaterialContainer = () => {
  const [clase, setClase] = useState("");
  const [fileText, setFileText] = useState("");
  const [clasesDisponibles, setClasesDisponibles] = useState([]);

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

  const handleInput = (e) => {
    console.log(e.target);

    //mostrar un texto con el nombre del archivo
    setFileText("Archivo subido");
  };

  //falta handleSubmit
  return (
    <>
        <CargarMaterial
          clase={clase}
          clasesDisponibles={clasesDisponibles}
          handleChangeClases={handleChangeClases}
          handleInput={handleInput}
          fileText={fileText}
        />
    </>
  );
};

export default CargarMaterialContainer;
