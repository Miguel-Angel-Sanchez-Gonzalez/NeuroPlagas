const connection = require('../models/db');
const jwt = require('jsonwebtoken');

module.exports.login = (req, res) => {
  const {username, password} = req.body; //  Extrae el cuerpo (body) de la solicitud HTTP y lo asigna a la variable username y password
  console.log(`Mi nombre de user es: ${username} y mi contraseña es: ${password}`);

  //Consulta SQL para saber si existe este user en la BD
  const consult = 'SELECT * FROM usuario WHERE nombre_usuario = ? AND contrasenia = ?';

  try {
    connection.query(consult, [username, password], (err, result) => {
      if (err) { // Si hay un error
        res.send(err);
      }

      if(result.length > 0){ //Si hay un user con esas credenciales en la BD


        try { // Consulta para saber el Rol del usuario
          const consultGetRol = 'SELECT rol FROM usuario WHERE nombre_usuario = ? AND contrasenia = ?';
          connection.query(consultGetRol, [username, password], (err, result) => {
            if (err) { 
              res.send(err); 
              return; // Importante: Si hay un error, salir de la función
            }
            // Si la consulta se realiza correctamente y devuelve un resultado
            if (result.length > 0) { 
              const rolUsuario = result[0].rol;
              // Aquí puedes manejar la variable rolUsuario como desees
              // Por ejemplo, enviarla en la respuesta de la solicitud HTTP
              //console.log(`El Rol encontrado es: ${rolUsuario}`);


              const token = jwt.sign({username, rolUsuario}, "Stack", {
                expiresIn: '3m'
              });
      
              res.send({ result, token });
              //console.log(result); //Imprime en la terminal de VSC

            } else {
              // Si no se encuentra ningún usuario con el nombre de usuario y contraseña proporcionados
              res.send("Usuario no encontrado");
            }
          });
        } catch (error) {
        // Manejo de errores fuera del callback de la función query
        console.error("Error en la consulta SQL:", error);
        }
              
        
      } else { // Si no hay errores pero no encontro nada en la BD
        console.log('El user no existe en la DB');
        res.send({message: 'El user no existe en la database'})
      }
    });
  } catch (error) {
    
  }

}