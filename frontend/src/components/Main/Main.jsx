import Home from '../Home/Home.jsx';
import Login from '../Login/Login.jsx'


// Funcion para decodificar el JWT Token
function parseJwt (token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

// Validacion para saber si el Token es valido y si existe
let tokenExistAndStillValid = (parseJwt(localStorage.getItem('token')).exp * 1000 > Date.now());

const Main = () => {
  //Validamos el token
  return (
    <>{tokenExistAndStillValid ? <Home /> : <Login />}</> //Si el token existe manda a Home si no a Login
  );
}

export default Main;