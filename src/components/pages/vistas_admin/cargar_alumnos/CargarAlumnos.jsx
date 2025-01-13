import {
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";



const CargarAlumnos = ({ clasesDisponibles, clase, handleChangeClases, año, alumnos, handleChangeAño, handleChange, handleSubmit, values }) => {
 


  return (
    <div className="basicContainer">
      <Typography className="titles" variant="h4">
        Cargar lista de alumnos
      </Typography>
      <div className="secondaryContainer">
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

          <FormControl color="secondary" className="classSelector">
            <InputLabel id="label-año">Año</InputLabel>
            <Select
              labelId="label-año"
              // id="demo-simple-select"
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
        </span>
        <Table>
          <TableHead>
            <TableCell>Alumno</TableCell>
          </TableHead>
          {alumnos &&
            alumnos.map((alumno) => (
              <TableRow key={alumno._id}>
                {/* <TableCell name="id_alumno" value={value}>{alumno._id}</TableCell> */}

                <TableCell name="id_alumno" value={alumno._id}>
                  {alumno.nombre} {alumno.apellido}
                </TableCell>
              </TableRow>
            ))}
        </Table>
        <form onSubmit={handleSubmit}>
          <Typography>Agregar alumno a la clase</Typography>
          <Input
            className="inputLista"
            name="apellido"
            onChange={handleChange}
            value={values.apellido}
          ></Input>
          <Button type="submit" variant="contained" color="secondary">
            Enviar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CargarAlumnos;
