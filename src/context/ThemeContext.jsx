import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "'Quicksand', sans-serif",
    h1: { fontFamily: "'League Gothic', sans-serif" },
    h2: { fontFamily: "'League Gothic', sans-serif" },
    h3: { fontFamily: "'League Gothic', sans-serif" },
    h4: { fontFamily: "'League Gothic', sans-serif" },
  },
  palette: {
    primary: {
      main: "#833433",
      light: "#c89c8a",
      dark: "#5f191c",
    },
  },
});

export default theme;
