const express = require('express');
const cors = require('cors');
const { testConnection } = require('./config/db');
require('dotenv').config();

// Importar rutas
const registrosRoutes = require('./routes/registros');

// Inicializar Express
const app = express();
const PORT = process.env.PORT || 5003;

// CORS más permisivo para desarrollo
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', '*');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

// Middleware estándar
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas de la API
app.use('/api/registros', registrosRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ mensaje: 'API de Registro funcionando correctamente' });
});

// Iniciar el servidor
async function iniciarServidor() {
  // Probar la conexión a la base de datos
  const conexionExitosa = await testConnection();
  
  if (conexionExitosa) {
    app.listen(PORT, () => {
      console.log(`Servidor ejecutándose en el puerto ${PORT}`);
    });
  } else {
    console.error('No se pudo iniciar el servidor debido a problemas con la base de datos');
  }
}

iniciarServidor();