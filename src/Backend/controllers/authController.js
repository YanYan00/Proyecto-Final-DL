const jwt = require('jsonwebtoken')
const {verificarCredencialesBD,registrarUsuarioBD,actualizarDatosBD, actualizarPasswordBD} =require("../models/authModels.js")


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
const actualizarPerfil = async(req,res) => {
    try {
        const {id} = req.params;
        const datos =  req.body;
        if(datos.tipo === 'datos'){
            const perfil = await actualizarDatosBD(id,datos);
            res.status(200).json(perfil);
        }
        else if(datos.tipo === 'password'){
            if(datos.password !== datos.confirmPass){
                return res.status.json({error: "Las contraseñas no coinciden"});
            }
            const perfil = await actualizarPasswordBD(id, datos.password);
            res.status(200).json(perfil);
        }
    } catch (error) {
        res.status(error.code || 500).json({
            error: error.message
        });
    }
}
module.exports={
    login,
    register,
    actualizarPerfil
}