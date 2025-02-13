import { Typography } from "@mui/material";

const Certificados = ({ url }) => {
    console.log(url)
  return (
    <div className="basicContainer">
      {url !== "" ? (
        <div className="repsonsiveiFrame">
          <iframe
            src={`${url}#view=Fit&statusbar=0&messages=0&navpanes=0&scrollbar=0`}
          />
        </div>
      ) : (
        <Typography variant="h4">No tienes un certificado</Typography>
      )}
    </div>
  );
};

export default Certificados;
