import React, { useState } from 'react';

const Reset = ({ onClose, email }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleClose = () => {
    onClose();
  };

  const handleChangePassword = () => {
    if (password === confirmPassword) {
      setMessage('Las contraseñas coinciden.');
    } else {
      setMessage('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
    }
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    if (!value.match(/^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/)) {
      setPasswordError('La contraseña debe contener al menos 8 caracteres, incluyendo al menos un número y una letra.');
    } else {
      setPasswordError('');
    }
  };

  return (
    <div className="reset-container">
      <h2 className="login-label1">Cambiar contraseña</h2>

      <p className="login-label">Contraseña nueva</p>

      <input
        className="password-reset-input"
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => handlePasswordChange(e.target.value)}
      />
      {passwordError && <p className="error-message">{passwordError}</p>}

      <p className="login-label">Confirma la contraseña nueva</p>

      <input
        className="password-reset-input"
        type="password"
        placeholder="••••••••"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <button onClick={handleChangePassword} className="login-button otp-input-button">Cambiar contraseña</button>
      <button onClick={handleClose} className="login-button otp-input-button">Cancelar</button>

      {message && <p>{message}</p>}
    </div>
  );
}

export default Reset;
