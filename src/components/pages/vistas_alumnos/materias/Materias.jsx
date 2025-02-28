import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const Materias = ({ year, materias }) => {
  return (
    <div className="basicContainer">
      <Typography className="titles" variant="h4">
        Materias del año {year}
      </Typography>

      <div className="secondaryContainer">
        <Table className="asistencias">
          <TableHead>
            <TableRow>
              <TableCell>Materia</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {materias.length > 0 ? (
              materias.map((materia) => (
                <TableRow key={materia}>
                  <TableCell>{materia} </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3}>
                  {" "}
                  No hay notas registradas en este año
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Materias;
