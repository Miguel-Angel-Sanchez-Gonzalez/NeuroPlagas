import React, { useState, useEffect, useRef } from 'react';
import { RiAdminFill } from "react-icons/ri";
import './NavbarAdmin.css';
import ProfileAdmin from '../ProfileAdmin/ProfileAdmin';

const NavbarAdmin = ({onConfigureProfileClick, username, email}) => {



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
    localStorage.setItem('email', '');
    window.location.href = '/login'; // Redirige al usuario a la página de inicio de sesión
  };

  const handleProfileFormCancel = () => {
    setshowProfileAdmin(false);
  };

  return (
    <div className='navbar-container-admin'>
      <div className='menu--nav-admin'>
      <img src="/images/tomatito.png" alt="" /> {/*Imagen*/}
        <h2>NeuroPlagas</h2>              {/*Titulo*/}
        <div className='notify-admin' ref={menuRef}>
            <RiAdminFill className='icon' onClick={toggleMenu}/>   
            {menuVisible && (
              <div className="menu-options-admin">
                <p onClick={onConfigureProfileClick}>Configurar perfil</p> {/* Llama a la función desde las props */}
                <p onClick={handleLogout}>Cerrar sesión</p>
              </div>
            )}
        </div>
        <div className='user-info-admin'>
          <label>{username}</label>
          <br />
          <label>{email}</label>
        </div>
      </div>
      
      {showProfileAdmin && <ProfileAdmin onCancelClick={handleProfileFormCancel} />}
    </div>
  );
};

export default NavbarAdmin;
