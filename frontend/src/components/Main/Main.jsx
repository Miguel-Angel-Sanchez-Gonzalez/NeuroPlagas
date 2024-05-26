import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "../Login/Login.jsx";
import HomeAdmin from "../Admin/HomeAdmin/HomeAdmin.jsx";
import HomeFarmer from "../Farmer/HomeFarmer/HomeFarmer.jsx";
import HomeWorker from "../Worker/HomeWorker/HomeWorker.jsx";
import ProtectedRoute from "../../ProtectedRoute.jsx";

function parseJwt(token) {
  if (!token || token === "") return null;
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
}

const Main = () => {
  const token = localStorage.getItem("token");
  const tokenExistAndNotEmpty = token && token !== "";
  const tokenIsValid =
    tokenExistAndNotEmpty && parseJwt(token).exp * 1000 > Date.now();

  const isLoggedIn = token && token !== "";

  let rolUsuario = null;
  if (tokenIsValid) {
    const decodedToken = parseJwt(token);
    rolUsuario = decodedToken.rolUsuario;
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/homeAdmin/*"
        element={
          <ProtectedRoute>
            <HomeAdmin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/homeFarmer/*"
        element={
          <ProtectedRoute>
            <HomeFarmer />
          </ProtectedRoute>
        }
      />
      <Route
        path="/homeWorker/*"
        element={
          <ProtectedRoute>
            <HomeWorker />
          </ProtectedRoute>
        }
      />
      <Route
        path="/"
        element={
          tokenIsValid ? (
            rolUsuario === "admin" ? (
              <Navigate to="/homeAdmin/agricultores" />
            ) : rolUsuario === "farmer" ? (
              <Navigate to="/homeFarmer/notificaciones" />
            ) : rolUsuario === "worker" ? (
              <Navigate to="/homeWorker/notificaciones" />
            ) : (
              <Navigate to="/login" />
            )
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
};

export default Main;
