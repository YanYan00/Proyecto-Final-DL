const jwt = require('jsonwebtoken')
const {verificarCredencialesBD} =require("../models/authModels.js")


const login = async(req, res) => {
    try {
        const { correo, password } = req.body;
        const usuario = await verificarCredencialesBD(correo, password);
        const token = jwt.sign({ correo }, "#N4n0m4rk3t", { expiresIn: 240 });
        const response = {
            token,
            user: {
                correo: usuario.correo
            }
        };
        console.log('Respuesta a enviar:', response);
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

module.exports={
    login
}