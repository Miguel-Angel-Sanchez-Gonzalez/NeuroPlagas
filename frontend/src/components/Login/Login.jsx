import React, { useState } from 'react';
import './Login.css'; // Asegúrate de tener el nombre correcto del archivo CSS
import HomeAdmin from '../Admin/HomeAdmin/HomeAdmin';
import HomeFarmer from '../Farmer/HomeFarmer/HomeFarmer';
import HomeWorker from '../Worker/HomeWorker/HomeWorker';
import LoginNotification from '../LoginNotifications/LoginNotifications'; // Importa el componente de notificación

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccessfull, setLoginSuccessfull] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handdleLogin = (e) => {
    e.preventDefault();
    
    const data = {
      username: username,
      password: password
    };

    fetch('http://localhost:3000/login',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        if (result.token) {
          localStorage.setItem('token', result.token);
          localStorage.setItem('userRole', result.userRole); // Guardamos el rol del usuario en el almacenamiento local
          setLoginSuccessfull(true);
          window.location.reload(); // Recargar la página
        } else {
          setErrorMessage('Las credenciales proporcionadas son inválidas. Por favor, verifica tu nombre de usuario y contraseña');
          setLoginSuccessfull(false);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  // Función para renderizar el componente Home según el rol
  const renderHomeByRole = () => {
    const userRole = localStorage.getItem('userRole');
    switch (userRole) {
      case 'admin':
        return <HomeAdmin />;
      case 'farmer':
        return <HomeFarmer />;
      case 'worker':
        return <HomeWorker />;
      default:
        return null;
    }
  };

  return (
    <>
      {loginSuccessfull ? (
        // Si el inicio de sesión es exitoso, renderizamos el componente Home correspondiente
        renderHomeByRole()
      ) : (
        // Si el inicio de sesión no es exitoso, mostramos el formulario de inicio de sesión
        <div className="login-container">
          <img src="/images/farmedwithfruit3d.png" className="img-fruit" />
          <img src="/images/womenfarmer.png" className="img-women" />
          <form className="login-form">
            <label className="login-label">Bienvenido de nuevo</label>
            <label className="login-label1">Iniciar sesión</label>
            <div className="input-field"> 
              <input onChange={(event) => { setUsername(event.target.value) }} type="text" required></input>
              <label>Ingresa tu nombre de usuario</label>
            </div>
            <div className="input-field"> 
              <input onChange={(event) => { setPassword(event.target.value) }} type="password" required></input>
              <label>Contraseña</label>
            </div>
            <label className="login-label3">Olvidé mi contraseña</label>
            <button className="login-button" onClick={handdleLogin}>Iniciar sesión</button>
            <label className="login-abajo">¿Sin una cuenta?</label>
            <label className="login-invitado">Iniciar como invitado</label>
            {errorMessage && <LoginNotification message={errorMessage} onClose={() => setErrorMessage('')} />}
          </form>
        </div>
      )}
    </>
  );
  
};

export default Login;
