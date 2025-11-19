require('dotenv').config();
const express = require('express');
const cors = require('cors'); 
const mongoose = require('mongoose');

const authRoutes = require('./routes/authRoutes');
const remedio_routes = require('./routes/remedioRoutes');
const pedido_routes = require('./routes/pedidoRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

app.get('/teste', (req, res) => {
    res.send('O Servidor está vivo e funcionando!');
});



app.use(cors({
    origin: [
        'https://farmacia-react-v2.vercel.app',
        'https://farmacia-react-v2.vercel.app/', 
        'http://localhost:5173', 
        'http://localhost:3000'  
    ],
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'], 
    allowedHeaders: ['Content-Type', 'Authorization'] 
}));

app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('CONECTANDO AO BANCO DE DADOS'))
    .catch((err) => console.error('Erro ao conectar:', err));


app.use('/api/remedios', remedio_routes);
app.use('/api/pedidos', pedido_routes);
app.use('/api/auth', authRoutes);


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});