const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const dotenv = require('dotenv'); // Agrega dotenv para cargar variables de entorno desde .env
dotenv.config(); // Carga las variables de entorno de .env

const app = express();
const port = 3000;
const routes = require('./api/endPoints');

app.use(express.json()); // Interpreta como el JSON que enviamos del frontend al backend
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:4000',
  methods: ['GET', 'POST']
}));

// Función para enviar correos electrónicos
function sendEmail({ recipient_email, OTP }) {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD,
      },
    });

    const mailConfig = {
      from: process.env.MY_EMAIL,
      to: recipient_email,
      subject: 'Recuperación de Contraseña - NeuroPlagas',
      html: `<!DOCTYPE html>
    <html lang="es" >
    <head>
      <meta charset="UTF-8">
      <title>Correo de Recuperación de Contraseña - NeuroPlagas</title>
    </head>
    <body>
    <div style="font-family: Helvetica, Arial, sans-serif; min-width:1000px; overflow:auto; line-height:2">
      <div style="margin:50px auto; width:70%; padding:20px 0">
        <div style="border-bottom:1px solid #eee">
          <a href="#" style="font-size:1.4em; color: #c62426; text-decoration:none; font-weight:600">NeuroPlagas</a>
        </div>
        <p style="font-size:1.1em">¡Hola!</p>
        <p>Gracias por elegir NeuroPlagas. Utiliza el siguiente código para completar tu proceso de recuperación de contraseña. El código es válido por 5 minutos:</p>
        <h2 style="background: #c62426; margin: 0 auto; width: max-content; padding: 0 10px; color: #fff; border-radius: 4px;">${OTP}</h2>
        <p style="font-size:0.9em;">Saludos,<br />El equipo de NeuroPlagas</p>
        <hr style="border:none; border-top:1px solid #eee" />
        <div style="float:right; padding:8px 0; color:#aaa; font-size:0.8em; line-height:1; font-weight:300">
          <p>NeuroPlagas Inc</p>
          <p>Dirección de la empresa</p>
          <p>Ciudad, País</p>
        </div>
      </div>
    </div>
    </body>
    </html>`,
    };
    

    transporter.sendMail(mailConfig, function (error, info) {
      if (error) {
        console.log(error);
        return reject({ message: 'An error has occurred' });
      }
      return resolve({ message: 'Email sent successfully' });
    });
  });
}

app.post('/send_recovery_email', (req, res) => {
  sendEmail(req.body)
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
});

app.use('/', routes);

app.listen(port, () => {
  console.log(`Servidor backend iniciado en el puerto ${port}`);
});
