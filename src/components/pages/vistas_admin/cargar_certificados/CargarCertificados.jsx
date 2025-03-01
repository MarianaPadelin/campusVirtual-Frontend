import { Button, Input, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const CargarCertificados = ({ handleInput, fileText, formik }) => {
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  return (
    <div className="basicContainer">
      <Typography className="titles" variant="h3">
        Cargar certificado de alumno regular
      </Typography>
      <div className="secondaryContainer">
        <Typography className="titles" variant="h6">
          Ingresar los datos del alumno
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <span className="oneRowDiv">
            <Input
              placeholder="Nombre"
              className="inputLista"
              name="nombreAlumno"
              onChange={formik.handleChange}
              //   value={values.nombre}
              //   error
            ></Input>
            <Input
              placeholder="Apellido"
              className="inputLista"
              name="apellidoAlumno"
              onChange={formik.handleChange}
              //   value={values.apellido}
              //   error
            ></Input>

            <div>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Cargar certificado
                <VisuallyHiddenInput
                  type="file"
                  onChange={(event) => {
                    handleInput(event);
                  }}
                  name="file"
                />
              </Button>
              {fileText !== "" && (
                <Typography variant="subtitle1">{fileText}</Typography>
              )}
            </div>
            <Button
              className="buttonEnviarTp"
              variant="contained"
              type="submit"
            >
              Enviar
            </Button>
          </span>
        </form>
      </div>
    </div>
  );
};

export default CargarCertificados;
