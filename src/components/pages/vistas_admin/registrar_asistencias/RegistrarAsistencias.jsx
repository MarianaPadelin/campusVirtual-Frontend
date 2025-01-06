import { DataGrid } from "@mui/x-data-grid";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import Paper from "@mui/material/Paper";
import { Button, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";

const RegistrarAsistencias = () => {
  const columns = [
    { field: "Alumno", headerName: "Alumno", width: 70 },
   
  ];

  const rows = [
    { id: 1, Alumno: "Test 1" },
    { id: 2, Alumno: "Test 2" },
    { id: 3, Alumno: "Test 3" },
    { id: 4, Alumno: "Test 4" },
    { id: 5, Alumno: "Test 5" },
    { id: 6, Alumno: "Test 6" },
  ];

  return (
    <div className="basicContainer">
      <Typography className="titles" variant="h4">
        Registro de asistencias
      </Typography>

      <div className="secondaryContainer">
        <span className="spanTable">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker  className="datePicker" label="Seleccionar fecha" />
          </LocalizationProvider>
          <FormControl color="secondary" className="classSelector">
            <InputLabel id="demo-simple-select-label">Clase</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={clase}
              label="Clase"
              // onChange={handleChange}
            >
              <MenuItem value={1}>Acrobacia</MenuItem>
              <MenuItem value={2}>Preparación física</MenuItem>
              <MenuItem value={3}>Danza</MenuItem>
            </Select>
          </FormControl>
        </span>
        <Paper sx={{ height: 450, width: "100%" }} className="asistenciasContainer">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </Paper>
        <Button variant="contained" color="secondary">
          Enviar
        </Button>
      </div>
    </div>
  );
};

export default RegistrarAsistencias;
