const express = require('express');
const app = express();
const port = 3000;
const routes = require('./api/endPoints');
const cors = require('cors');

app.use(express.json()); // Interpreta como el JSON que enviamos del frontend al backend
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: 'http://localhost:4000',
  methods: ['GET', 'POST']
}));

app.use('/', routes);

app.listen(port, () => {
  console.log(`Servidor backend iniciado en el puerto ${port}`);
});
