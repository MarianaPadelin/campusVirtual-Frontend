import { Button, Table, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

const Tp = () => {
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
        Subir Trabajos Prácticos
      </Typography>
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
          onChange={(event) => console.log(event.target.files)}
          multiple
        />
      </Button>
      <div className="secondaryContainer">
        <Typography className="titles" variant="h5">
          Trabajos prácticos subidos
        </Typography>
        <Table>
          <TableHead>
            <TableCell>Clase</TableCell>
            <TableCell>Fecha de subida</TableCell>
            <TableCell>Archivo</TableCell>
          </TableHead>
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
        </Table>
      </div>
    </div>
  );
};

export default Tp;
