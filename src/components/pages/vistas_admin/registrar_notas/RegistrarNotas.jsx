import { Button, FormControl, InputLabel, MenuItem, Select, Table, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";

const RegistrarNotas = ({alumnos}) => {
  return (
    <div className="basicContainer">
      <Typography className="titles" variant="h4">
        Registro de notas
      </Typography>
      <div className="secondaryContainer">
        <span className="spanTable">
          <FormControl color="secondary" className="classSelector">
            <InputLabel id="label-clase">Clase</InputLabel>
            <Select
              labelId="label-clase"
              // id="demo-simple-select"
              // value={clase}
              label="Clase"
              // onChange={handleChange}
            >
              <MenuItem value={1}>Acrobacia</MenuItem>
              <MenuItem value={2}>Preparación física</MenuItem>
              <MenuItem value={3}>Danza</MenuItem>
            </Select>
          </FormControl>

          <FormControl color="secondary" className="classSelector">
            <InputLabel id="label-año">Año</InputLabel>
            <Select
              labelId="label-año"
              // id="demo-simple-select"
              // value={clase}
              label="Clase"
              // onChange={handleChange}
            >
              <MenuItem value={1}>2022</MenuItem>
              <MenuItem value={2}>2023</MenuItem>
              <MenuItem value={3}>2024</MenuItem>
              <MenuItem value={3}>2025</MenuItem>
            </Select>
          </FormControl>
        </span>
        <Table>
          <TableHead>
            <TableCell>Alumno</TableCell>
            <TableCell>Nota julio</TableCell>
            <TableCell>Nota diciembre</TableCell>
          </TableHead>

          {alumnos &&
            alumnos.map((alumno) => (
              <TableRow key={alumno._id}>
                <TableCell>{alumno.nombre}</TableCell>
                <TableCell>
                  <TextField variant="outlined" className="inputPagos" />
                </TableCell>
                <TableCell>
                  <TextField variant="outlined" className="inputPagos" />
                </TableCell>
              </TableRow>
            ))}
        </Table>

        <Button variant="contained" color="secondary">
          Enviar
        </Button>
      </div>
    </div>
  );
}

export default RegistrarNotas