import React from 'react';

const HomeWorker = () => {
  const handleLogout = () => {
    // Establece el token como una cadena vacía
    localStorage.setItem('token', '');
    // Redirige al usuario a la página de inicio de sesión
    window.location.href = '/'; // Redirige a la ruta de inicio de sesión
  };

  return (
    <div>
      <div>Felicidades Trabajador estás loggeado!</div>
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
};

export default HomeWorker;
