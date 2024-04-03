import Home from '../Home/Home.jsx';
import Login from '../Login/Login.jsx'
import React from 'react';

// Función para decodificar el JWT Token
function parseJwt(token) {
  if (!token || token === '') return null; // Si el token no existe o es una cadena vacía, devuelve null
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window.atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
}

const Main = () => {
  // Obtiene el token del almacenamiento local
  const token = localStorage.getItem('token');
  
  // Valida si el token existe y si no está vacío
  const tokenExistAndNotEmpty = token && token !== '';

  // Valida si el token es válido
  const tokenIsValid = tokenExistAndNotEmpty && parseJwt(token).exp * 1000 > Date.now();

  // Retorna Home si el token es válido, de lo contrario retorna Login
  return <>{tokenIsValid ? <Home /> : <Login />}</>;
};

export default Main;
