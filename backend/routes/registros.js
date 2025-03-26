const express = require('express');
const router = express.Router();
const registrosController = require('../controllers/registrosController');

// Rutas para registros
router.get('/', registrosController.obtenerTodos);
router.get('/:id', registrosController.obtenerPorId);
router.post('/', registrosController.crear);
router.put('/:id', registrosController.actualizar);
router.delete('/:id', registrosController.eliminar);

module.exports = router;