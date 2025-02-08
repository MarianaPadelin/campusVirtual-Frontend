import { FormControl, InputLabel, MenuItem, Select, Table, TableCell, TableHead, TableRow, Typography } from "@mui/material";

const Asistencias = ({ faltas, año, handleChangeAño }) => {
  return (
    <div className="basicContainer">
      <Typography className="titles" variant="h4">
        Asistencias
      </Typography>
      <div className="secondaryContainer">
        <FormControl className="classSelector">
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
        <Table className="asistencias">
          {window.innerWidth > 768 ? (
            <TableHead>
              <TableCell>Clase</TableCell>
              <TableCell>Total de faltas</TableCell>
              <TableCell>Ausentes</TableCell>
              <TableCell>Faltas disponibles</TableCell>
            </TableHead>
          ) : (
            <TableHead>
              <TableCell>Clase</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Ausentes</TableCell>
              <TableCell>Disponibles</TableCell>
            </TableHead>
          )}

          {faltas.length > 0 ? (
            faltas.map((falta) => (
              <TableRow key={falta.clase}>
                <TableCell>{falta.clase}</TableCell>
                <TableCell>{falta.totalFaltas}</TableCell>
                <TableCell>{falta.ausentes}</TableCell>
                <TableCell>
                  {falta.totalFaltas - falta.ausentes}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4}>
                No hay asistencias registradas en este año
              </TableCell>
            </TableRow>
          )}
        </Table>
      </div>
    </div>
  );
};

export default Asistencias;
