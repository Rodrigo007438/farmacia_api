const mongoose = require('mongoose');

const user_schema = new mongoose.Schema({
    nome: {type: String, required: true},
    email: {type: String, required: true},
    senha: {type: String, required:true},
    perfil: {type: String, enum: ['cliente', 'gerente'], default: 'cliente'}
});

module.exports = mongoose.model('User', user_schema);