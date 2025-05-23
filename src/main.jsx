import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider } from "@mui/material/styles";
import theme from './context/ThemeContext.jsx';

createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <App />
   </ThemeProvider>,
)
