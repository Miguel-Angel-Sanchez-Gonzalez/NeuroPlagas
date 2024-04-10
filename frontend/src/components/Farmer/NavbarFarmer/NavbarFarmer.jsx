import React, { useState, useEffect, useRef } from 'react';
import { GiFarmer } from "react-icons/gi";
import './NavbarFarmer.css';  // Importa el archivo de estilos CSS

const NavbarFarmer = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuVisible(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleProfile = () => {
    // Lógica para configurar perfil
    console.log('Configurar perfil');
  };

  const handleLogout = () => {
    localStorage.setItem('token', ''); // Establece el token como una cadena vacía
    window.location.href = '/login'; // Redirige al usuario a la página de inicio de sesión
  };

  return (
    <div className='navbar-container'>
      <div className='menu--nav'>
        <img src="/images/tomatito.png"/> {/*Imagen*/}
        <h2>NeuroPlagas</h2>              {/*Titulo*/}
        <div className='notify' ref={menuRef}>
          <GiFarmer className='icon' onClick={toggleMenu}/>   {/*Icono del rol*/}
          {menuVisible && (
            <div className="menu-options">
              <p onClick={handleProfile}>Configurar perfil</p>
              <p onClick={handleLogout}>Cerrar sesión</p>
            </div>
          )}
        </div>
        <div className='user-info'>
          <label>Lizeth Antonio</label>
          <br />
          <label>1916@gmail.com</label>
        </div>
      </div>
    </div>
  );
};

export default NavbarFarmer;
