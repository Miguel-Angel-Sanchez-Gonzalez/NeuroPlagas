import React from 'react';
import HomeAdmin from '../Admin/HomeAdmin/HomeAdmin.jsx';
import HomeFarmer from '../Farmer/HomeFarmer/HomeFarmer.jsx';
import HomeWorker from '../Worker/HomeWorker/HomeWorker.jsx';
import Login from '../Login/Login.jsx';

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
  console.log("El token de este user desde el Main es:" );
  console.log(token);

  // Valida si el token existe y si no está vacío
  const tokenExistAndNotEmpty = token && token !== '';

  // Valida si el token es válido
  const tokenIsValid = tokenExistAndNotEmpty && parseJwt(token).exp * 1000 > Date.now();

  // Extrae el rolUsuario del token si el token es válido
  let rolUsuario = null;
  if (tokenIsValid) {
    const decodedToken = parseJwt(token);
    rolUsuario = decodedToken.rolUsuario;
  }

  // Retorna el componente correspondiente según el rol del usuario
  if (tokenIsValid) {
    switch (rolUsuario) {
      case 'admin':
        return <HomeAdmin />;
      case 'farmer':
        return <HomeFarmer />;
      case 'worker':
        return <HomeWorker />;
      default:
        return <Login />;
    }
  } else {
    return <Login />;
  }
};

export default Main;
