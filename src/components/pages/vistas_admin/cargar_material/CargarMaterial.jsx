import { Button, FormControl, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";


const CargarMaterial = ({ clasesDisponibles, clase, handleChangeClases, handleInput, fileText}) => {

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
      <form>
        {" "}
        <span className="spanTable">
          <FormControl color="secondary" className="classSelector">
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
            <span className="subSpanTable">
              <div>
                <Button
                  color="secondary"
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                >
                  Cargar archivo
                  <VisuallyHiddenInput
                    type="file"
                    onChange={handleInput}
                    name="image"
                    // multiple
                  />
                </Button>
                {fileText !== "" && <Typography variant="subtitle1" >{fileText}</Typography>}
              </div>

              <Button variant="contained" color="secondary" type="submit">
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
            <TableCell>Clase</TableCell>
            <TableCell>Fecha de subida</TableCell>
            <TableCell>Archivo</TableCell>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Acrobacia</TableCell>
              <TableCell>05/02/25</TableCell>
              <TableCell>
                <Link>Descargar archivo</Link>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Preparación física</TableCell>
              <TableCell>05/03/25</TableCell>
              <TableCell>
                <Link>Descargar archivo</Link>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Danza</TableCell>
              <TableCell>15/03/25</TableCell>
              <TableCell>
                <Link>Descargar archivo</Link>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CargarMaterial