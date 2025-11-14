const mongoose = require('mongoose');

 const remedio_schema = new mongoose.Schema({
        name: String,
        preco: String,
        quantidade_estoque: Number,
        imagem_url: String,
        promocao: Boolean
    });

    module.exports = mongoose.model('Remedio', remedio_schema);