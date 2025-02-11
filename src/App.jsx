import "./App.css";

import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { rutasApp } from "./routes/rutasApp";
import { rutasPublicas } from "./routes/rutasPublicas";
import Layouts from "./components/layouts/Layouts";
import Error from "./components/pages/vistas_alumnos/error/Error";
import axios from "axios";

import UserContextProvider, { UserContext } from "./context/UserContext";
import { useContext, useEffect, useState } from "react";
import Forbidden from "./components/pages/forbidden/Forbidden";
import Loader from "./components/common/loader/Loader";
import Swal from "sweetalert2";
import { config } from "./config.js"

axios.defaults.baseURL= config.backendURL;
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
  const [timeoutReached, setTimeoutReached] = useState(false);

  useEffect(() => {
    let timer;
    console.log(rolUsuario);
    if (rolUsuario.length === undefined && !isPublicRoute()) {
      timer = setTimeout(() => {
        setTimeoutReached(true);
        Swal.fire({
          icon: "warning",
          text: "La sesión expiró",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.replace("/");
          }
        });
      }, 8000);
    }

    return () => clearTimeout(timer); // Cleanup the timeout if the user logs in before 8 seconds
  }, [rolUsuario]);

  if (timeoutReached) {
    return null; // Prevent further rendering after timeout
  }

  if (rolUsuario.length === undefined && !isPublicRoute()) {
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

    return rutasPublicas.some(({ path }) => {
      // Check if the path has a dynamic parameter (e.g., ":token")
      const dynamicMatch = path.includes(":")
        ? currentPath.startsWith(path.split("/:")[0]) // Compare base URL before dynamic param
        : currentPath === path;

      return dynamicMatch;
    });
  }

  // Helper to check if the role is authorized for the current protected route
  function isRoleAuthorized() {
    const currentPath = window.location.pathname;
    return rutasApp.some(({ path, role }) => {
      // Check if the path has a dynamic parameter (e.g., ":id", ":token")
      const dynamicMatch = path.includes(":")
        ? currentPath.startsWith(path.split("/:")[0]) // Compare base URL before dynamic param
        : currentPath === path;

      return dynamicMatch && role === rolUsuario;
    });
  }
}

export default App;
