import React, { useState, useEffect, useRef } from 'react';
import { HiMenu } from "react-icons/hi";
import './NavbarAdmin.css';
import ProfileAdmin from '../ProfileAdmin/ProfileAdmin';

const NavbarAdmin = ({onConfigureProfileClick}) => {
  const storedUsername = localStorage.getItem('username');
  const storedLastname = localStorage.getItem('lastname');
  const storedSecondLastname = localStorage.getItem('secondlastname');
  const storedEmail = localStorage.getItem('email');

  const [showProfileAdmin, setshowProfileAdmin] = useState(false);
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

  const handleLogout = () => {
    //Reset de variables
    localStorage.setItem('token', '');  
    localStorage.setItem('username', '');
    localStorage.setItem('lastname', '');
    localStorage.setItem('secondlastname', '');
    localStorage.setItem('email', '');
    // Redirige al usuario a la página de inicio de sesión
    window.location.href = '/login'; 
  };

  const handleProfileFormCancel = () => {
    setshowProfileAdmin(false);
  };

  return (
    <div >
      <div className='menu--nav-admin'>
      <img src="/images/tomatito.png" alt="" /> {/*Imagen*/}
        <h2>Tomi-Plagas y Enfermedades </h2>              {/*Titulo*/}
        <div className='notify-admin' ref={menuRef}>
            <HiMenu className='icon' onClick={toggleMenu}/>   
            {menuVisible && (
              <div className="menu-options-admin">
                <p onClick={onConfigureProfileClick}>Configurar perfil</p> {/* Llama a la función desde las props */}
                <p onClick={handleLogout}>Cerrar sesión</p>
              </div>
            )}
        </div>
        <div className='user-info-admin'>
          <label>{storedUsername +" "+ storedLastname +" "+ storedSecondLastname}</label>
          <br />
          <label>{storedEmail}</label>
        </div>
      </div>
      
      {showProfileAdmin && <ProfileAdmin onCancelClick={handleProfileFormCancel} />}
    </div>
  );
};

export default NavbarAdmin;
