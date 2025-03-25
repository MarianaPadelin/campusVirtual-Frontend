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
  TextField,
  Typography,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
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
  year,
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
        Cargar material didáctico
      </Typography>
      <form className="materialForm" onSubmit={formik.handleSubmit}>
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
              <MenuItem value={year - 3}>{year - 3}</MenuItem>
              <MenuItem value={year - 2}>{year - 2}</MenuItem>
              <MenuItem value={year - 1}>{year - 1}</MenuItem>
              <MenuItem value={year}>{year}</MenuItem>
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

                  <TextField
                    multiline="true"
                    placeholder="Breve descripción"
                    name="description"
                    onChange={formik.handleChange}
                  ></TextField>

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

                  <TextField
                    multiline="true"
                    placeholder="Breve descripción"
                    name="description"
                    onChange={formik.handleChange}
                  ></TextField>
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
          Material subido
        </Typography>
        <Table className="tablaMaterial">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Descripción</TableCell>
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
                  {archivo.description ? ( <TableCell>{archivo.description}</TableCell>) : (<TableCell>No hay descripción</TableCell>)}
                 
                  <TableCell>
                      <Link to={archivo.url} target="_blank">
                        Ver material
                      </Link>
                   
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
