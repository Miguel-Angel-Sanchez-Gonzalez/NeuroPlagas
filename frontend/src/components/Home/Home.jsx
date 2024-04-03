import React from 'react';

const Home = () => {
  const handleLogout = () => {
    // Establece el token como una cadena vacía
    localStorage.setItem('token', '');
    // Redirige al usuario a la página de inicio de sesión
    window.location.href = '/login'; // Redirige a la ruta de inicio de sesión
  };

  return (
    <div>
      <div>Felicidades estás loggeado!</div>
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
};

export default Home;
