const express = require('express');
const server = express();
const pool = require('./bd/server.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

server.use(express.json());

server.get("/nanomarket/productos",async (req,res)=>{
    try {
        const {rows} =await pool.query("SELECT * FROM Productos");
        res.status(200).json(rows);    
    } catch (error) {
        res.status(500).json({error: error.message});
    }
})
server.post("/nanomarket/login",async (req,res)=>{
    try {
        const { correo, password } = req.body;       
        const consulta = "SELECT idusuario AS idUsuario, correo, password, nombre FROM Usuarios WHERE correo = $1";
        const result = await pool.query(consulta, [correo]);
        if (result.rowCount === 0) {
            return res.status(401).json({ error: "Usuario no encontrado" });
        }
        const usuario = result.rows[0];
        const passCorrecta = await bcrypt.compare(password, usuario.password);
        if(!passCorrecta){
            return res.status(401).json({ error: "Contraseña incorrecta"});
        }
        const token = jwt.sign({correo},"#N4n0m4rk3t",{expiresIn: 240});
        res.status(200).json({
            token,
            user:{
                correo: usuario.correo,
                idUsuario: usuario.idusuario
            }
        });        
    } catch (error) {
        res.status(500).json({error: error.message});
    }

})
server.post("/nanomarket/register",async(req,res)=>{
    const comprobarEmail = async(email) =>{
        const consulta = "SELECT correo FROM Usuarios WHERE correo = $1";
        const result = await pool.query(consulta, [email]);
        return result.rowCount>0;
    }
    try {
        const {correo,password,nombre} = req.body;
        const emailExiste = await comprobarEmail(correo);
        if(emailExiste){
            return res.status(400).json({error: "El correo ya está registrado"});
        }
        const passwordEncriptada =bcrypt.hashSync(password);
        const fechaCreacion = new Date().toISOString().split('T')[0];
        const values = [nombre,passwordEncriptada,fechaCreacion,correo];
        const consulta = "INSERT INTO Usuarios VALUES (DEFAULT,$1,$2,$3,$4)";
        await pool.query(consulta,values);
        res.status(201).json({message: "Usuario registrado exitosamente"})
    } catch (error) {
        res.status(500).json({error: error.message});
    }
})
module.exports = server;

