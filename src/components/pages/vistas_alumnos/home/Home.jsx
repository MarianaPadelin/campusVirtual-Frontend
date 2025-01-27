import { Typography } from "@mui/material"

const Home = ({nombre, apellido, email}) => {
  return (
    <div className="basicContainer">
      <Typography className="titles" variant="h4">
        Bienvenido a la escuela {nombre} {apellido}
      </Typography>
      <Typography>
        Tus datos: {email}
      </Typography>
    </div>
  );
}

export default Home