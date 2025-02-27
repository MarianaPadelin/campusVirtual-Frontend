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
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DownloadIcon from "@mui/icons-material/Download";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

const CargarMaterial = ({
  clasesDisponibles,
  año,
  clase,
  handleChangeClases,
  handleChangeAño,
  formik,
  handleInput,
  fileText,
  archivos,
  borrarArchivo,
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
        Cargar material didáctico
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
          <FormControl className="classSelector">
            <InputLabel id="label-año">Año</InputLabel>
            <Select
              labelId="label-año"
              value={año}
              label="Clase"
              onChange={handleChangeAño}
            >
              <MenuItem value={2022}>2022</MenuItem>
              <MenuItem value={2023}>2023</MenuItem>
              <MenuItem value={2024}>2024</MenuItem>
              <MenuItem value={2025}>2025</MenuItem>
            </Select>
          </FormControl>
          {clase && (
            <span className="subSpanTable">
              {/* <input
                type="file"
                name="file"
                onChange={(event) => {
                  formik.setFieldValue("file", event.currentTarget.files[0]);
                }}
              ></input> */}
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
                className="buttonEnviarTp"
                variant="contained"
                type="submit"
              >
                Enviar
              </Button>
            </span>
          )}
        </span>
      </form>

      <div className="secondaryContainer">
        <Typography className="titles" variant="h5">
          Material subido
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Archivo</TableCell>
              <TableCell>Eliminar archivo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {archivos.length > 0 ? (
              archivos.map((archivo) => (
                <TableRow key={archivo._id}>
                  <TableCell>{archivo.nombre}</TableCell>
                  <TableCell>{archivo.fecha}</TableCell>
                  <TableCell>
                    {window.innerWidth > 768 ? (
                      <Link to={archivo.url} target="_blank">
                        Descargar archivo
                      </Link>
                    ) : (
                      <Link to={archivo.url} target="_blank">
                        <Button>
                          <DownloadIcon />
                        </Button>
                      </Link>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
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
                <TableCell colSpan={4}> No se encontraron archivos</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CargarMaterial;
