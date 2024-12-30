import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="basicContainer">
      <h1>Oops! Página no encontrada</h1>
      <img src="https://res.cloudinary.com/dvxkjikvk/image/upload/v1735581996/campus/AcrobatFall-Web-V2_bxlirl.jpg" />
    <Link to="/">Volver</Link>
    </div>
  );
};

export default Error;
