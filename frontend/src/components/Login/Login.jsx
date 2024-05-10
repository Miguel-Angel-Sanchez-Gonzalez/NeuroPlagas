import React, { useState } from 'react';
import './Login.css';
import HomeAdmin from '../Admin/HomeAdmin/HomeAdmin';
import HomeFarmer from '../Farmer/HomeFarmer/HomeFarmer';
import HomeWorker from '../Worker/HomeWorker/HomeWorker';
import LoginNotification from '../LoginNotifications/LoginNotifications'; // Importa el componente de notificación
import PasswordRecovery from '../LoginRecoveryPassword/PasswordRecovery/PasswordRecovery'; // Importa el componente de recuperación de contraseña


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccessfull, setLoginSuccessfull] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showRecovery, setShowRecovery] = useState(false); // Estado para controlar la visibilidad del componente de recuperación de contraseña
  


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
          localStorage.setItem('userRole', result.rol); // Guardamos el rol del usuario en el almacenamiento local
          console.log("rol del user", result.rol);
          setLoginSuccessfull(true);


          const data2 = {
            username: username,
            password: password,
            role:result.rol
          };

          fetch('http://localhost:3000/login/getDataByUsername',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data2)
          })
            .then(response => response.json())
            .then(result => {
              if (result[0] != undefined) {
                console.log("La data del user es: ");
                console.log(result[0]);
                localStorage.setItem('username', result[0].nombre);
                localStorage.setItem('lastname', result[0].primer_apellido);
                localStorage.setItem('secondlastname', result[0].segundo_apellido);
                localStorage.setItem('email', result[0].correo_electronico);
                window.location.reload();
              }else{
                console.log("Objeto sin data");
              }
            })
            .catch(error => {
              console.log(error);
            });
            
        } else {
          setErrorMessage('Las credenciales proporcionadas son inválidas. Por favor, verifica tu nombre de usuario y contraseña');
          setLoginSuccessfull(false);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };


  const handleRecoveryClick = () => {
    setShowRecovery(true); // Mostrar el componente de recuperación de contraseña cuando se hace clic en el enlace
  };


  // Función para renderizar el componente Home según el rol
  const renderHomeByRole = () => {
    const userRole = localStorage.getItem('userRole');
    switch (userRole) {
      case 'admin':
        return <HomeAdmin />;
      case 'farmer':
        return <HomeFarmer />;
      // case 'worker':
      //   return <HomeWorker />;
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
          <img src="/images/farmedwithfruit3d.png" alt="Fruit farm" className="img-fruit" />
          <img src="/images/womenfarmer.png" alt="Woman farmer" className="img-women" />
          <form className="login-form">
            <label className="login-label">Bienvenido de nuevo</label>
            <label className="login-label1">Iniciar sesión</label>
            <div className="input-datos"> 
              <input onChange={(event) => { setUsername(event.target.value) }} type="text" required></input>
              <label>Ingresa tu nombre de usuario</label>
            </div>
            <div className="input-datos"> 
              <input onChange={(event) => { setPassword(event.target.value) }} type="password" required></input>
              <label>Contraseña</label>
            </div>
            <button className="login-button" onClick={handdleLogin}>Iniciar sesión</button>
            <label className="login-abajo" onClick={handleRecoveryClick}>Olvidé mi contraseña</label> 
            {errorMessage && <LoginNotification message={errorMessage} onClose={() => setErrorMessage('')} />}
          </form>
        </div>
      )}
      {showRecovery && <PasswordRecovery onClose={() => setShowRecovery(false)} />} {/* Mostrar el componente de recuperación de contraseña cuando showRecovery es true */}
    </>
  );
};

export default Login;