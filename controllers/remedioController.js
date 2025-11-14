const Remedio = require('../models/remedioModel');

exports.get_remedios = async(req, res) => {
    try{
            const {promocao} = req.query;
            const filtro = {};

            if(promocao === 'true'){
                filtro.promocao = true;
            }
            const remedios = await Remedio.find(filtro);
            res.json(remedios);
        } catch(err){
            res.status(500).json({message: err.message});
        }
}

exports.create_remedios = async(req, res) =>{
    try{
            const novo_remedio = new Remedio(req.body);
            const remedio_salvo = await novo_remedio.save();
            res.status(201).json(remedio_salvo);
        }catch(err){
            res.status(400).json({message: err.message});
        }
}

exports.update_remedios = async(req, res) => {
    try{
            const { id } = req.params;
            const remedioAtualizado = await Remedio.findByIdAndUpdate(id, req.body, { new: true });
            if (!remedioAtualizado) return res.status(404).json({ message: "Não encontrado" });
            res.json(remedioAtualizado);
    } catch (err) {
            res.status(400).json({ message: err.message });
    }    
}

exports.delete_remedios = async(req, res) => {
    try{
            const {id} = req.params;

            const remedio_deletado = await Remedio.findByIdAndDelete(id);

            if(!remedio_deletado){
                return res.status(404).json({message: 'Remedio não encontrado'});
            }
            res.json({message: 'Remedio deletado com sucesso!'});
        }catch(err){
            res.status(500).json({message: err.message});
        }
}