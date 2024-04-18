import React, { useState } from 'react';
import axios from 'axios';
import './PasswordRecovery.css';
import OTPInput from '../OTPInput/OTPInput';

const PasswordRecovery = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [generatedOTP, setGeneratedOTP] = useState('');
  const [isPasswordRecoveryOpen, setIsPasswordRecoveryOpen] = useState(true);
  const [isOTPInputOpen, setIsOTPInputOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    // Expresión regular para validar el formato del correo electrónico
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const sendRecoveryEmail = () => {
    if (validateEmail(email)) {
      setIsLoading(true);
      // la ruta del nuevo endpoint que creamos para verificar si el correo electrónico existe en la base de datos
      axios.post("http://localhost:3000/check_email_existence", { email }) //La función axios.post envía los datos necesarios al servidor. En este caso, se envía un objeto JSON que contiene el correo electrónico proporcionado por el usuario.
      .then((response) => {
        if (response.data.exists) {
          // El correo existe en la base de datos, continuar con el envío del correo de recuperación
          const OTP = Math.floor(Math.random() * 9000 + 1000);
          console.log("El código OTP generado es:", OTP);
          setGeneratedOTP(OTP);

          axios.post("http://localhost:3000/send_recovery_email", {
            OTP,
            recipient_email: email,
          })
          .then(() => {
            console.log("Correo de recuperación enviado con éxito");
            setIsPasswordRecoveryOpen(false);
            setIsOTPInputOpen(true);
            setIsLoading(false);
            alert("Correo de recuperación enviado con éxito");
          })
          .catch((error) => {
            console.error("Error al enviar el correo de recuperación:", error);
            setErrorMessage('Error al enviar el correo de recuperación');
            setIsLoading(false);
          });
        } else {
          // El correo no existe en la base de datos
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
      {isLoading && ( // Muestra la animación de carga si isLoading es true
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
      {isPasswordRecoveryOpen && (
        <div className="password-recovery-container">
          <h2 className="password-recovery-title">Recuperación de Contraseña</h2>
          <h4>Ingrese el correo asociado a su cuenta</h4>
          <div className='input-field'>
          <input
            className="password-recovery-input" 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Ingresa tu correo electrónico</label>
          </div>
          <button className="password-recovery-button" onClick={sendRecoveryEmail}>
            {isLoading ? 'Enviando..' : 'Enviar'}
          </button> 
          <button className="password-recovery-button" onClick={onClose}>Cerrar</button> 
          <p>{errorMessage}</p>
        </div>
      )}
      {isOTPInputOpen && (
        <OTPInput onClose={onClose} generatedOTP={generatedOTP} email={email} />
      )}
    </div>
  );
};

export default PasswordRecovery;
