import { Typography } from "@mui/material";

const Certificados = ({ url }) => {
    console.log(url)
  return (
    <div className="basicContainer">
      {url ? (
        <iframe src={`${url}`} />
      ) : (
        <Typography variant="h4">No tienes un certificado</Typography>
      )}
    </div>
  );
};

export default Certificados;
