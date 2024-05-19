import React from 'react';
import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const parseJwt = (token) => {
  if (!token) return null;
  const base64Url = token.split('.')[1];
  if (!base64Url) return null;
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  try {
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(c => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error('Error parsing token:', e);
    return null;
  }
};

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const tokenIsValid = token && parseJwt(token)?.exp * 1000 > Date.now();

  if (!tokenIsValid) {
    localStorage.removeItem('token'); // Eliminar el token de localStorage
    toast.error("Tu sesión ha expirado. Por favor, inicia sesión de nuevo.")
    return (
      <>
        <ToastContainer/>
        <Navigate to="/login" replace />
      </>
    );
  }

  return children;
};

export default ProtectedRoute;
