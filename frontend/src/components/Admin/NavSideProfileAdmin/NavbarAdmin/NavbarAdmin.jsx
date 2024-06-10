import React, { useState, useEffect, useRef } from 'react';
import { HiMenu } from "react-icons/hi";
import './NavbarAdmin.css';
import ProfileAdmin from '../ProfileAdmin/ProfileAdmin';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const NavbarAdmin = ({ onConfigureProfileClick }) => {
  const [user, setUser] = useState({
    username: localStorage.getItem('username') || '',
    lastname: localStorage.getItem('lastname') || '',
    secondLastname: localStorage.getItem('secondlastname') || '',
    email: localStorage.getItem('email') || ''
  });

  const [showProfileAdmin, setShowProfileAdmin] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setUser({
      username: localStorage.getItem('username') || '',
      lastname: localStorage.getItem('lastname') || '',
      secondLastname: localStorage.getItem('secondlastname') || '',
      email: localStorage.getItem('email') || ''
    });
  }, []);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleLogout = () => {
    // Reset de variables
    localStorage.setItem('token', '');
    localStorage.setItem('username', '');
    localStorage.setItem('lastname', '');
    localStorage.setItem('secondlastname', '');
    localStorage.setItem('email', '');
    // Actualiza el estado del usuario
    setUser({
      username: '',
      lastname: '',
      secondLastname: '',
      email: ''
    });
    // Redirige al usuario a la página de inicio de sesión
    navigate('/login');
  };

  const handleProfileFormCancel = () => {
    setShowProfileAdmin(false);
  };

  return (
    <div>
      <div className='menu--nav-admin'>
        <img src="/images/tomatito.png" alt="" /> {/*Imagen*/}
        <h2>Tomi-Plagas y Enfermedades </h2> {/*Titulo*/}
        <div className='notify-admin' ref={menuRef}>
          <HiMenu className='icon' onClick={toggleMenu} />
          {menuVisible && (
            <div className="menu-options-admin">
              <p onClick={onConfigureProfileClick}>Configurar perfil</p> {/* Llama a la función desde las props */}
              <p onClick={handleLogout}>Cerrar sesión</p>
            </div>
          )}
        </div>
        <div className='user-info-admin'>
          <label>{`${user.username} ${user.lastname} ${user.secondLastname}`}</label>
          <br />
          <label>{user.email}</label>
        </div>
      </div>

      {showProfileAdmin && <ProfileAdmin onCancelClick={handleProfileFormCancel} />}
    </div>
  );
};

export default NavbarAdmin;
