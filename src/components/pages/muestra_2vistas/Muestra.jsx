import { Link } from "react-router-dom";

const Muestra = () => {
  return (
    <>
      <h1>¿Qué perfil querés ver?</h1>

      <Link to="/alumnos">
        <button>Ver perfil de alumno</button>
      </Link>
      <Link to="/admin">
        <button>Ver perfil de admin</button>
      </Link>
    </>
  );
}

export default Muestra