const Pedido = require('../models/pedidoModel');

exports.get_pedidos = async(req, res) => {
    try{
            const pedidos = await Pedido.find();
            res.json(pedidos);
        }catch(err){
            res.status(500).json({message: err.message});
        }
}

exports.create_pedidos = async(req, res) =>{
    try{
            const novo_pedido = new Pedido(req.body);
            const pedido_salvo = await novo_pedido.save();
            res.status(201).json(pedido_salvo);
        }catch(err){
            res.status(400).json({message: err.message});
        }
}

exports.delete_pedidos = async(req, res) =>{
    try{
            const {id} = req.params;
            const pedido_deletado = await Pedido.findByIdAndDelete(id);

            if(!pedido_deletado){
                return res.status(404).json({message: 'Pedido não encontrado'});
            }
            res.json({message: 'Pedido deletado com sucesso!'});
        }catch(err){
            res.status(500).json({ message: err.message });
        }
}