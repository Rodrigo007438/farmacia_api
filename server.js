require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Trazemos ele de volta
const mongoose = require('mongoose');

const authRoutes = require('./routes/authRoutes');
const remedio_routes = require('./routes/remedioRoutes');
const pedido_routes = require('./routes/pedidoRoutes');

const app = express();
const PORT = process.env.PORT || 4000;


app.use(cors({
   
    origin: 'https://farmacia-react-v2.vercel.app', 
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
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