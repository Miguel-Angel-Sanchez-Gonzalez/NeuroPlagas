const express = require('express');
const router = express.Router();
const { ping } = require('../controllers/pingController');
const { login } = require('../controllers/loginController');
const { checkEmailExistence } = require('../controllers/passwordRecoveryController'); // Importa la función para verificar la existencia del correo electrónico

router.get('/ping', ping);
router.post('/login', login);
router.post('/check_email_existence', checkEmailExistence); // Agrega la nueva ruta para verificar la existencia del correo electrónico

module.exports = router;
