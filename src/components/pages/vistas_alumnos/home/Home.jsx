import { Typography } from "@mui/material"

const Home = ({alumno}) => {
  return (
    <div className="basicContainer">
      <Typography className="titles" variant="h4">
        Bienvenido a la escuela {alumno.nombre} {alumno.apellido}
      </Typography>
      <Typography>
        Tus datos: {alumno.email}
      </Typography>
    </div>
  );
}

export default Home