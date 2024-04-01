import React, { useState } from 'react';
import './Login.css'; // Asegúrate de tener el nombre correcto del archivo CSS
import Home from '../Home/Home';

const Login = () => {

  // Hooks para username y password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccessfull, setLoginSuccessfull] = useState (false);


  // Disparador para el boton de Login
  const handdleLogin = (e) => {
    e.preventDefault();
    
    // Creamos el objeto a enviar al server con los datos de login
    const data = {
      username: username,
      password: password
    };

    // Endpoint en el server que va a recibir los parametros que vamos a enviar con POST
    fetch('http://localhost:3000/login',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // Indica que el cuerpo de la solicitud está en formato JSON
      },
      body: JSON.stringify(data) // Vamos a enviar nuestro objeto que ya contiene username y password
    })
      .then(response => response.json()) //  Maneja la respuesta HTTP, convirtiendo la respuesta a formato JSON
      
      .then(result => {
        
        if (result.token) { //Validamos que el Token exista
          console.log(result.token);
          localStorage.setItem('token', result.token) //Guardamos localmente el Token Original
          setLoginSuccessfull(true); 
        }else{
          window.alert("¡Este usuario no esta registrado!");
          setLoginSuccessfull(false);
        }


      })
      
      .catch(error => { //Si el user no existe captura la exepcion
        console.log(error);
      })
  }

  return (
    <>{loginSuccessfull ? <Home />:
    <div className="login-container">
      <form className="login-form">
        <label className="login-label">Username:</label>
        <input onChange={(event) => {setUsername(event.target.value)}} type="text" className="login-input" />
        <label className="login-label">Password:</label>
        <input onChange={(event) => {setPassword(event.target.value)}} type="password" className="login-input" />
        <button className="login-button" onClick={handdleLogin}>Login</button>
      </form>
    </div>}</>
  );
};

export default Login;
