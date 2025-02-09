import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DownloadIcon from "@mui/icons-material/Download";
const Tp = ({
  formik,
  fileText,
  handleInput,
  clase,
  handleChangeClases,
  clasesDisponibles,
  archivos,
  borrarArchivo
}) => {
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
      <Typography className="titles" variant="h4">
        Subir Trabajos Prácticos
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <span className="spanTable">
          <FormControl className="classSelector">
            <InputLabel id="demo-simple-select-label">Clase</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={clase}
              label="Clase"
              onChange={handleChangeClases}
            >
              {clasesDisponibles &&
                clasesDisponibles.map((c) => {
                  return (
                    <MenuItem key={c} value={c}>
                      {c}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
          <span className="subSpanTable">
            <div>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Cargar archivo
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
              variant="contained"
              type="submit"
              className="buttonEnviarTp"
            >
              Enviar
            </Button>
          </span>
        </span>
      </form>

      <div className="secondaryContainer">
        <Typography className="titles" variant="h5">
          Trabajos prácticos subidos
        </Typography>
        <Table className="asistencias">
          <TableHead>
            <TableRow>
              <TableCell>Clase</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Archivo</TableCell>
              <TableCell>Eliminar archivo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {archivos.length > 0 ? (
              archivos.map((archivo) => (
                <TableRow key={archivo.url}>
                  <TableCell>{archivo.clase}</TableCell>
                  <TableCell>{archivo.nombre}</TableCell>
                  <TableCell>{archivo.fecha}</TableCell>
                  <TableCell>
                    <Link to={archivo.url}>
                    Descargar
                    <DownloadIcon color="primary" />
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        console.log("en tp", archivo)
                        borrarArchivo(archivo._id);
                      }}
                    >
                      <HighlightOffIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}> No se encontraron archivos</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Tp;
