const connection = require('../models/db');
const jwt = require('jsonwebtoken');

module.exports.login = (req, res) => {
  const {username, password} = req.body; //  Extrae el cuerpo (body) de la solicitud HTTP y lo asigna a la variable username y password
  console.log(`Mi nombre de user es: ${username} y mi contraseña es: ${password}`);

  //Consulta SQL para saber si existe este user en la BD
  const consult = 'SELECT * FROM login WHERE username = ? AND password = ?';

  try {
    connection.query(consult, [username, password], (err, result) => {
      if (err) { // Si hay un error
        res.send(err);
      }

      if(result.length > 0){ //Si hay un user con esas credenciales en la BD
        const token = jwt.sign({username}, "Stack", {
          expiresIn: '1m'
        });
        
        res.send({ result, token });

        console.log(result);
        
      } else { // Si no hay errores pero no encontro nada en la BD
        console.log('El user no existe en la DB');
        res.send({message: 'El user no existe en la database'})
      }
    })
  } catch (error) {
    
  }

}