const app = express();
const PORT = process.env.PORT || 4000;

// --- A MARRETA (CORS MANUAL) ---
// Isso força o cabeçalho em TODAS as respostas, na marra.
app.use((req, res, next) => {
    // "Qualquer um pode entrar (*)"
    res.header("Access-Control-Allow-Origin", "*");
    // "Aceito esses métodos"
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    // "Aceito esses cabeçalhos"
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    
    // Se for só um "olá" do navegador (OPTIONS), libera logo
    if (req.method === 'OPTIONS') {
        return res.status(200).send({});
    }
    
    next();
});
// -------------------------------

app.use(express.json());
// ... resto do código ...

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('CONECTANDO AO BANCO DE DADOS'))
    .catch((err) => console.error('Erro ao conectar:', err));

app.use('/api/remedios', remedio_routes);
app.use('/api/pedidos', pedido_routes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () =>{
    console.log(`Servidor rodando na porta ${PORT}`);
});