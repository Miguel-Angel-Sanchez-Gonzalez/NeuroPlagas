const connection = require('../models/db');

module.exports.checkEmailExistence = (req, res) => {
  const { email } = req.body;

  const query = 'SELECT * FROM persona WHERE correo_electronico = ?';

  connection.query(query, [email], (error, results) => {
    if (error) {
      console.error("Error al verificar el correo electrónico:", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }

    if (results.length > 0) {
      return res.json({ exists: true });
    } else {
      return res.json({ exists: false });
    }
  });
};
