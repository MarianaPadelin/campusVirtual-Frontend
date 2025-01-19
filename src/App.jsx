import './App.css'

import { BrowserRouter, Route, Routes } from "react-router-dom"
import { rutasApp } from './routes/rutasApp';
import Layouts from './components/layouts/Layouts';
import Error from './components/pages/vistas_alumnos/error/Error';
import axios from 'axios';
import LoginContainer from './components/pages/login/LoginContainer';
import RegisterContainer from './components/pages/register/RegisterContainer';
import ResetPasswordContainer from './components/pages/resetPassword/ResetPasswordContainer';
// import { config } from './config';

axios.defaults.baseURL = "http://localhost:3000";
// axios.defaults.baseURL= config.backendURL;
// axios.defaults.baseURL = "https://campus-virtual-backend.vercel.app";
// console.log(axios.defaults.baseURL)


axios.defaults.withCredentials = true;
function App() {
  return (
    <div className="main">
      <BrowserRouter>
        {/* <UserContextProvider> */}
        {/* <CartContextProvider> */}

        <Routes>
          <Route path="/" element={<LoginContainer />}></Route>
          <Route path="/register" element={<RegisterContainer />}></Route>
          <Route path="/resetPassword" element={<ResetPasswordContainer />}></Route>
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
