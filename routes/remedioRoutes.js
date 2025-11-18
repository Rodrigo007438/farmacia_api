const express = require('express');

const router = express.Router();

const remedio_controller = require('../controllers/remedioController');

router.get('/', remedio_controller.get_remedios);
//router.post('/', remedio_controller.create_remedios);
//router.put('/:id', remedio_controller.update_remedios);
//router.delete('/:id', remedio_controller.delete_remedios);

module.exports = router;