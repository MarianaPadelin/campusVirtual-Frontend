import './App.css'

import { BrowserRouter, Route, Routes } from "react-router-dom"
import { rutasApp } from './routes/rutasApp';
import Layouts from './components/layouts/Layouts';
import Error from './components/pages/vistas_alumnos/error/Error';
import axios from 'axios';
import LoginContainer from './components/pages/login/LoginContainer';
import RegisterContainer from './components/pages/register/RegisterContainer';
import ResetPasswordContainer from './components/pages/resetPassword/ResetPasswordContainer';
import UserContextProvider from './context/UserContext';
// import { config } from './config';

// axios.defaults.baseURL = "http://localhost:3000";
// axios.defaults.baseURL= config.backendURL;
// console.log(axios.defaults.baseURL)
axios.defaults.baseURL = "https://campus-virtual-backend.vercel.app";

axios.defaults.headers.common['Content-Type'] = 'application/json' // for all requests

axios.defaults.withCredentials = true;
function App() {
  return (
    <div className="main">
      <BrowserRouter>
        <UserContextProvider>
          <Routes>
            <Route path="/" element={<LoginContainer />}></Route>
            <Route path="/register" element={<RegisterContainer />}></Route>
            <Route
              path="/resetPassword"
              element={<ResetPasswordContainer />}
            ></Route>
            <Route element={<Layouts />}>
              {rutasApp.map(({ id, path, Element }) => (
                <Route key={id} path={path} element={<Element />} />
              ))}
            </Route>
            <Route path="*" element={<Error />} />
          </Routes>
        </UserContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App
