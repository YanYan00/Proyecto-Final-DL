const jwt = require('jsonwebtoken')
const {verificarCredencialesBD,registrarUsuarioBD} =require("../models/authModels.js")


const login = async(req, res) => {
    try {
        const { correo, password } = req.body;
        const usuario = await verificarCredencialesBD(correo, password);
        const token = jwt.sign({ correo }, "#N4n0m4rk3t", { expiresIn: 240 });
        const response = {
            token,
            user: {
                correo: usuario.correo,
                idUsuario : usuario.idusuario
            }
        };
        res.status(200).json(response);
    } catch (error) {
        console.error('Error en controller:', {
            message: error.message,
            code: error.code
        });
        res.status(error.code || 500).json({
            error: error.message || 'Error interno del servidor'
        });
    }
}
const register = async(req,res) => {
    try {
        const usuario = req.body;
        await registrarUsuarioBD(usuario);
        res.send('Usuario registrado correctamente');
    } catch (error) {
        res.status(500).send(error);
    }
}
module.exports={
    login,
    register
}