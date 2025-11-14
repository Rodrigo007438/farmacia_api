const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const gera_tolken = (id, perfil) =>{
    return jwt.sign({id, perfil}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

exports.registrar = async (req, res) =>{
    try{
        const {nome, email, senha, perfil} = req.body;

        const user_existe = await User.findOne({email});

        if(user_existe){
            return res.status(400).json({message: 'Email já cadastrado'});
        }

        const salt = await bcrypt.genSalt(10);
        const senha_cripto = await bcrypt.hash(senha, salt);

        const novo_user = await User.create({
            nome,
            email,
            senha: senha_cripto,
            perfil
        });

        if(novo_user){
            res.status(201).json({
                _id: novo_user.id,
                nome: novo_user.nome,
                email: novo_user.email,
                perfil: novo_user.perfil,
                tokken: gera_tolken(novo_user._id, novo_user.perfil)
            });
        }else{
            res.status(400).json({message: 'Dados Invalidos'});
        }
    }catch{
        res.status(500).json({message: error.message});
    }
};

exports.login = async (req, res) => {
    try{
        const {email, senha} = req.body;
        const user = await User.findOne({email});

        if(user &&(await bcrypt.compare(senha, user.senha))){
            res.json({
                _id: user.id,
                nome: user.nome,
                email: user.email,
                perfil: user.perfil,
                token: gera_tolken(user._id, user.perfil)
            });
        }else{
            res.status(401).json({message: 'Email ou senha inválidos'});
        }
    }catch(error){
        res.status(500).json({message: error.message});
    }
};