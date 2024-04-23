import React, { useState, useEffect } from "react";
import axios from "axios";
import "./OTPInput.css";
import Reset from "../Reset/Reset"; // Asegúrate de importar el componente Reset desde el archivo correcto

const OTPInput = ({ onClose, generatedOTP, email }) => {
  const [otpInput, setOTPInput] = useState("");
  const [otpGenerated, setOTPGenerated] = useState(String(generatedOTP).trim());
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  const [isResendButtonDisabled, setIsResendButtonDisabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // Tiempo restante en segundos (120 segundos = 2 minutos)
  const [otpGenerationTime, setOTPGenerationTime] = useState(Date.now()); // Momento en que se generó el código OTP

  useEffect(() => {
    // Si el botón de reenvío está deshabilitado, comienza la cuenta regresiva
    if (isResendButtonDisabled) {
      const timer = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          // Si el tiempo restante llega a cero, detén el temporizador
          if (prevTimeLeft === 0) {
            clearInterval(timer);
            setIsResendButtonDisabled(false); // Habilita el botón de reenvío
            return 120; // Reinicia el tiempo restante a 2 minutos
          }
          return prevTimeLeft - 1; // Reduce el tiempo restante en 1 segundo
        });
      }, 1000); // Actualiza el tiempo cada segundo
      return () => clearInterval(timer); // Limpia el temporizador al desmontar el componente
    }
  }, [isResendButtonDisabled]);

  const handleVerifyOTP = () => {
    const cleanedOtpInput = otpInput.trim();
    const cleanedGeneratedOTP = otpGenerated.trim();

    if (cleanedOtpInput === cleanedGeneratedOTP) {
      // Verificar si el código aún es válido (dentro de los 2 minutos)
      const currentTime = Date.now();
      if (currentTime - otpGenerationTime > 120000) { // 120000 milisegundos = 2 minutos
        setErrorMessage("El código OTP ha expirado. Por favor, solicita uno nuevo.");
      } else {
        setIsOTPVerified(true);
        setErrorMessage("");
      }
    } else {
      setErrorMessage("El código OTP ingresado es incorrecto");
    }
  };

  const handleResendOTP = () => {
    setIsLoading(true);

    const OTP = Math.floor(Math.random() * 9000 + 1000);
    setOTPGenerated(String(OTP).trim());

    setIsResendButtonDisabled(true);
    setOTPGenerationTime(Date.now()); // Registrar el momento en que se generó el nuevo código OTP

    axios
      .post("http://localhost:3000/login/send_recovery_email", {
        OTP,
        recipient_email: email,
      })
      .then(() => {
        setIsLoading(false);
        alert("Código reenviado correctamente");
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error al enviar el nuevo código OTP:", error);
      });
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="otp-input-container">
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
      {!isOTPVerified ? (
        <>
          <div>
            <h2 className="otp-input-title">Verificación de email</h2>
            <p className="indicaciones">Ingresa el código OTP enviado a tu correo electrónico:</p>
            <div className="formulario">
            <div className="inputs-otp">
              <input
                type="text"
                maxLength="1"
                value={otpInput[0]}
                onChange={(e) => setOTPInput(otpInput.substring(0, 0) + e.target.value + otpInput.substring(1))}
              />
              <input
                type="text"
                maxLength="1"
                value={otpInput[1]}
                onChange={(e) => setOTPInput(otpInput.substring(0, 1) + e.target.value + otpInput.substring(2))}
              />
              <input
                type="text"
                maxLength="1"
                value={otpInput[2]}
                onChange={(e) => setOTPInput(otpInput.substring(0, 2) + e.target.value + otpInput.substring(3))}
              />
              <input
                type="text"
                maxLength="1"
                value={otpInput[3]}
                onChange={(e) => setOTPInput(otpInput.substring(0, 3) + e.target.value)}
              />
            </div>

              <button onClick={handleVerifyOTP} className="button-otp-verify">Verificar</button>
            </div>
          
            <div className="button-container-opt">
              <button
                onClick={handleResendOTP}
                className={`button-otp ${isResendButtonDisabled ? 'disabled' : ''}`}
                disabled={isResendButtonDisabled}
              >
                {isLoading ? 'Reenviando...' : 'Reenviar código'}
              </button>
              <button onClick={handleClose} className="button-otp">Cancelar</button>
            </div>
          
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {isResendButtonDisabled && (
        <p className="resend-info">Por favor, espera un momento para volver a enviar el código. Tiempo restante: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}</p>
      )}
        </div>
        </>
      ) : (
        <Reset onClose={onClose} email={email}/>
      )}
    </div>
  );
};

export default OTPInput;
