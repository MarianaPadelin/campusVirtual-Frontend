import {
  Box,
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
  TextField,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
const Tp = ({
  formik,
  fileText,
  handleInput,
  clase,
  handleChangeClases,
  clasesDisponibles,
  archivos,
  borrarArchivo,
  link,
  setLink,
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
      <Typography className="titles" variant="h3">
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
          {clase && (
            <div className="subSpanTable">
              {link ? (
                <div className="linkArchivo">
                  <TextField
                    placeholder="Título"
                    name="title"
                    onChange={formik.handleChange}
                  ></TextField>
                  <div className="uploadVariant">
                    <TextField
                      variant="outlined"
                      placeholder="Link al archivo"
                      name="url"
                      onChange={formik.handleChange}
                    ></TextField>
                    <Button
                      className="buttonMetodoCarga"
                      onClick={() => setLink(false)}
                    >
                      Prefiero Cargar archivo
                    </Button>
                  </div>

                  <Button
                    className="buttonEnviarTp"
                    variant="contained"
                    type="submit"
                  >
                    Enviar
                  </Button>
                </div>
              ) : (
                <div className="linkArchivo">
                  <div className="uploadVariant">
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
                    <Button onClick={() => setLink(true)}>
                      Prefiero Pegar link
                    </Button>
                  </div>
                  <Button
                    className="buttonEnviarTp"
                    variant="contained"
                    type="submit"
                  >
                    Enviar
                  </Button>
                </div>
              )}
            </div>
          )}
        </span>
      </form>

      <div className="secondaryContainer">
        <Typography className="titles" variant="h5">
          Trabajos prácticos subidos
        </Typography>
        <Table className="tablaMaterial">
          <TableHead>
            <TableRow>
              <TableCell>Clase</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Archivo</TableCell>
              <TableCell>Nota</TableCell>
              <TableCell>Devolución</TableCell>
              <TableCell>Eliminar archivo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {archivos.length > 0 ? (
              archivos.map((archivo) => (
                <TableRow key={archivo._id}>
                  <TableCell>{archivo.clase}</TableCell>
                  <TableCell>{archivo.nombre}</TableCell>
                  <TableCell>{archivo.fecha}</TableCell>
                  <TableCell>
                    <Link to={archivo.url} target="_blank">
                      <Button variant="outlined">Ver TP</Button>
                    </Link>
                  </TableCell>
                  {archivo.nota ? (
                    <TableCell>{archivo.nota}</TableCell>
                  ) : (
                    <TableCell></TableCell>
                  )}
                  {archivo.devolucion ? (
                    <TableCell>
                      <Box className="devoluciones">{archivo.devolucion}</Box>
                    </TableCell>
                  ) : (
                    <TableCell></TableCell>
                  )}

                  {archivo.nota ? (
                    <TableCell>
                      No se puede eliminar un archivo corregido
                    </TableCell>
                  ) : (
                    <TableCell>
                      <Button
                        title="Eliminar Archivo"
                        onClick={() => {
                          console.log("en tp", archivo);
                          borrarArchivo(archivo._id);
                        }}
                      >
                        <HighlightOffIcon />
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7}> No se encontraron archivos</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Tp;
