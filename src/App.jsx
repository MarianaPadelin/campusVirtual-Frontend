import './App.css'

import { BrowserRouter, Route, Routes } from "react-router-dom"
import { rutasApp } from './routes/rutasApp';
import Layouts from './layouts/Layouts';
import Error from './components/pages/vistas_alumnos/error/Error';
import Muestra from './components/pages/muestra_2vistas/Muestra';

function App() {
  return (
    <div className="main">
      <BrowserRouter>
        {/* <UserContextProvider> */}
        {/* <CartContextProvider> */}

        <Routes>
          <Route path="/" element={<Muestra />}>
          </Route>
          <Route element={<Layouts />}>
            {rutasApp.map(({ id, path, Element }) => (
              <Route key={id} path={path} element={<Element />} />
            ))}
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
        {/* </CartContextProvider> */}
        {/* </UserContextProvider> */}
      </BrowserRouter>
    </div>
  );
}

export default App
