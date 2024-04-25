import React, { useState } from 'react';
import axios from 'axios';
import './PasswordRecovery.css';
import OTPInput from '../OTPInput/OTPInput';
import LoginNotification from '../../LoginNotifications/LoginNotifications';

const PasswordRecovery = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [generatedOTP, setGeneratedOTP] = useState('');
  const [isPasswordRecoveryOpen, setIsPasswordRecoveryOpen] = useState(true);
  const [isOTPInputOpen, setIsOTPInputOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');


  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const sendRecoveryEmail = () => {
    if (validateEmail(email)) {
      setIsLoading(true);
      axios.post("http://localhost:3000/login/check_email_existence", { email })
        .then((response) => {
          if (response.data.exists) {
            const OTP = Math.floor(Math.random() * 9000 + 1000);
            setGeneratedOTP(OTP);

            axios.post("http://localhost:3000/login/send_recovery_email", {
              OTP,
              recipient_email: email,
            })
              .then(() => {
                setIsPasswordRecoveryOpen(false);
                setIsOTPInputOpen(true);
                setIsLoading(false);
                setAlertMessage('El código de recuperación se envió correctamente');
              })
              .catch((error) => {
                console.error("Error al enviar el correo de recuperación:", error);
                setAlertMessage('Error al enviar el correo de recuperación');
                setErrorMessage('Error al enviar el correo de recuperación');
                setIsLoading(false);
              });
          } else {
            setErrorMessage('El correo electrónico ingresado no corresponde a ningún usuario registrado');
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.error("Error al verificar el correo electrónico:", error);
          setErrorMessage('Error al verificar el correo electrónico');
          setIsLoading(false);
        });
    } else {
      setErrorMessage('Por favor, ingresa un correo electrónico válido');
    }
  };

  return (
    <div>
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
      {isPasswordRecoveryOpen && (
        <div className="password-recovery-container">
          <h2 className="password-recovery-title">Recuperación de Contraseña</h2>
          <h4 className='label-correo-asociado'>Ingrese el correo asociado a su cuenta, para recuperar su contraseña.</h4>
          <div className='contenedor-correo'>
            <input
              placeholder='ejemplo@gmail.com'
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='button-container-recovery'>
            <button className="password-recovery-button" onClick={sendRecoveryEmail}>
              {isLoading ? 'Enviando..' : 'Enviar'}
            </button>
            <button className="password-recovery-button" onClick={onClose}>Cerrar</button>
          </div>
          <p className='errorMessage'>{errorMessage}</p>
        </div>
      )}
      {isOTPInputOpen && (
        <OTPInput onClose={onClose} generatedOTP={generatedOTP} email={email} />
      )}
      {alertMessage && <LoginNotification message={alertMessage} onClose={() => setAlertMessage('')} />}
    </div>
  );
};

export default PasswordRecovery;
