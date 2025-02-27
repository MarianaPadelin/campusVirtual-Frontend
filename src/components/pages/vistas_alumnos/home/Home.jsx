import { Typography } from "@mui/material"

const Home = ({nombre, apellido}) => {
  return (
    <div className="basicContainer">
      <div className="homeAlumno">
        <div className="mensajeBienvenida">
          <Typography className="titleHome" variant="h3">
            CIRCO DE LAS ARTES
          </Typography>
          <Typography className="titleHome" variant="h4">
            Bienvenido {nombre} {apellido}
          </Typography>
        </div>
        <div>
          <img src="https://res.cloudinary.com/dvxkjikvk/image/upload/v1740659890/campus/WhatsApp_Image_2025-02-26_at_11.09.34_e9lbwq_ad52ae.jpg" />{" "}
        </div>{" "}
      </div>
    </div>
  );
}

export default Home