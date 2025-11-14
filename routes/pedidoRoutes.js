const express = require('express');
const router = express.Router();
const pedido_controller = require('../controllers/pedidoController');

router.get('/', pedido_controller.get_pedidos);
router.post('/', pedido_controller.create_pedidos);
router.delete('/:id', pedido_controller.delete_pedidos);

module.exports = router;