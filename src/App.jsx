import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { rutasApp } from "./routes/rutasApp";
import { rutasPublicas } from "./routes/rutasPublicas";
import Layouts from "./components/layouts/Layouts";
import Error from "./components/pages/vistas_alumnos/error/Error";
import axios from "axios";

import UserContextProvider, { UserContext } from "./context/UserContext";
import { useContext } from "react";
import Forbidden from "./components/pages/forbidden/Forbidden";
import Loader from "./components/common/loader/Loader";
// import { config } from './config';

axios.defaults.baseURL = "http://localhost:3000";
// axios.defaults.baseURL= config.backendURL;
// console.log(axios.defaults.baseURL)
// axios.defaults.baseURL = "https://campus-virtual-backend.vercel.app";

axios.defaults.headers.common["Content-Type"] = "application/json"; // for all requests

axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
      
        <MainRoutes />
      </BrowserRouter>
    </UserContextProvider>
  );
}

function MainRoutes() {
  const { rolUsuario } = useContext(UserContext); 

//corregir esto para resetPAssword
  if ((!rolUsuario || (rolUsuario.length === undefined)) && !isPublicRoute()) {
    return <Loader />;
  }

  if (rolUsuario.length > 0 && !isPublicRoute() && !isRoleAuthorized()) {
    return <Forbidden />;
  }

  return (
    <Routes>
      {/* Public Routes */}
      {rutasPublicas.map(({ id, path, Element }) => (
        <Route key={id} path={path} element={<Element />} />
      ))}

      {/* Protected Routes */}
      {rolUsuario && (
        <Route element={<Layouts />}>
          {rutasApp
            .filter(({ role }) => role === rolUsuario) // Only allow routes for matching roles
            .map(({ id, path, Element }) => (
              <Route key={id} path={path} element={<Element />} />
            ))}
        </Route>
      )}

      {/* Catch-All Route */}
      <Route path="*" element={<Error />} />
    </Routes>
  );

  // Helper to check if the current route is public
  function isPublicRoute() {
    const currentPath = window.location.pathname;
    return rutasPublicas.some(({ path }) => currentPath === path);
  }

  // Helper to check if the role is authorized for the current protected route
  function isRoleAuthorized() {
    const currentPath = window.location.pathname;
    return rutasApp.some(
      ({ path, role }) => path === currentPath && role === rolUsuario
    );
  }
}

// function App() {
//   const { rolUsuario } = useContext(UserContext);
  
//   return (
//     <div className="main">
//       <BrowserRouter>
//         <UserContextProvider>
//           <Routes>
//             <Route path="/" element={<LoginContainer />}></Route>
//             <Route path="/register" element={<RegisterContainer />}></Route>
//             <Route
//               path="/resetPassword"
//               element={<ResetPasswordContainer />}
//             ></Route>
//              {rolUsuario.length > 0 ? (
//               rolUsuario === "admin" ? ( 
//                 <Route element={<Layouts />}>
//                   {rutasApp.map(({ id, path, Element, role }) => (
//                     <Route key={id} path={path} element={<Element />} role={role} />
//                   ))}
//                 </Route>
//              ) : (
//                 <Forbidden />
//               )
//             ) : (
//               <Loader />
//             )} 

//             <Route path="*" element={<Error />} />
//           </Routes>
//         </UserContextProvider>
//       </BrowserRouter>
//     </div>
//   );
// }

export default App;
