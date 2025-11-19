require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Trazemos ele de volta
const mongoose = require('mongoose');

const authRoutes = require('./routes/authRoutes');
const remedio_routes = require('./routes/remedioRoutes');
const pedido_routes = require('./routes/pedidoRoutes');

const app = express();
const PORT = process.env.PORT || 4000;


// Configuração do CORS
app.use(cors({
    origin: [
        'https://farmacia-react-v2.vercel.app', // Seu site na Vercel (SEM BARRA NO FINAL)
        'https://farmacia-react-v2.vercel.app/', // Garantia caso venha com barra (opcional, mas seguro)
        'http://localhost:5173', // Vite (Local)
        'http://localhost:3000'  // Create React App (Local)
    ],
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'], // "UPDATE" não existe, removi.
    allowedHeaders: ['Content-Type', 'Authorization'] // Cabeçalhos comuns
}));

app.use(express.json());

// Conexão com o Banco
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('CONECTANDO AO BANCO DE DADOS'))
    .catch((err) => console.error('Erro ao conectar:', err));

// Rotas
app.use('/api/remedios', remedio_routes);
app.use('/api/pedidos', pedido_routes);
app.use('/api/auth', authRoutes);

// Ligar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});