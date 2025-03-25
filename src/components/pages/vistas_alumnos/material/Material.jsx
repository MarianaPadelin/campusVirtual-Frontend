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
import { Link } from "react-router-dom";

const Material = ({
  clase,
  año,
  handleChangeClases,
  handleChangeAño,
  clasesDisponibles,
  archivos,
  year
}) => {
  return (
    <div className="basicContainer">
      <Typography className="titles" variant="h3">
        Ver material didáctico
      </Typography>

      <div className="secondaryContainer">
        <span className="spanTable">
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
          <FormControl className="classSelector">
            <InputLabel id="demo-simple-select-label">Clase</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={clase}
              label="Clase"
              onChange={handleChangeClases}
            >
              {clasesDisponibles.length > 0 ? (
                clasesDisponibles.map((c) => {
                  return (
                    <MenuItem key={c} value={c}>
                      {c}
                    </MenuItem>
                  );
                })
              ) : (
                <MenuItem>No hay clases disponibles</MenuItem>
              )}
            </Select>
          </FormControl>
        </span>
        <Typography className="titles" variant="h5">
          Material subido
        </Typography>
        <Table className="tablaMaterial">
          <TableHead>
            <TableRow>
              <TableCell>Clase</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Archivo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {archivos.length > 0 ? (
              archivos.map((archivo) => (
                <TableRow key={archivo._id}>
                  <TableCell>{archivo.nombre}</TableCell>
                  <TableCell>{archivo.fecha}</TableCell>
                  {archivo.description ? (
                    <TableCell>{archivo.description}</TableCell>
                  ) : (
                    <TableCell>No hay descripción</TableCell>
                  )}
                  <TableCell>
                    <Link to={archivo.url} target="_blank">
                      <Button variant="outlined">Ver material</Button>
                    </Link>
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

export default Material;
