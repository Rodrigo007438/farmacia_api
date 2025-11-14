const mongoose = require('mongoose');

const pedido_schema = mongoose.Schema({
        remedio_nome: String,
        remedio_preco: String, 
        nome_cliente: String,
        email_cliente: String,
        quantidade_pedida: Number
    });

module.exports = mongoose.model('Pedido', pedido_schema);