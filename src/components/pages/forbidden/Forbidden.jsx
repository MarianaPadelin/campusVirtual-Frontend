import { Link } from "react-router-dom";

const Forbidden = () => {
  return (
    <div className="basicContainer">
      <h1>Oops! No tienes acceso a esta sección</h1>
      <img src="https://res.cloudinary.com/dvxkjikvk/image/upload/v1737987173/campus/403_Error_Forbidden-amico_e2scaa.svg" />
      <Link to="/">Volver</Link>
    </div>
  );
}

export default Forbidden