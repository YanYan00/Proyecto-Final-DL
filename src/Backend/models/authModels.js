const pool = require('../bd/server.js')
const bcrypt = require('bcryptjs')

const verificarCredencialesBD = async (correo, password) => {
    try {
        const consulta = "SELECT idusuario AS idUsuario, correo, password, nombre FROM Usuarios WHERE correo = $1";
        const result = await pool.query(consulta, [correo]);
        if (result.rowCount === 0) {
            throw { code: 401, message: "Usuario no encontrado" };
        }
        const usuario = result.rows[0];
        const passwordEsCorrecta = await bcrypt.compare(password, usuario.password);

        if (!passwordEsCorrecta) {
            throw { code: 401, message: "Contraseña incorrecta" };
        }
        return usuario;
    } catch (error) {
        throw { 
            code: error.code || 500, 
            message: error.message || "Error en la verificación"
        };
    }
}
const verificarCorreoRegistro = async (email) =>{
    try {
        const consulta = "SELECT correo FROM Usuarios WHERE correo = $1";
        const result = await pool.query(consulta, [email]);
        if (result.rowCount > 0){
            throw{
                code:400,
                message:"Este correo esta registrado"
            };
        }
    } catch (error) {
        throw {
            code: error.code || 500,
            message: error.message || "Error al verificar el correo"
        }
    }
}
const registrarUsuarioBD = async (usuario) =>{
    let {nombre,email, password } = usuario;
    await verificarCorreoRegistro(email);
    const passwordEncriptada = bcrypt.hashSync(password);
    const fechaCreacion = new Date().toISOString().split('T')[0];
    const values = [nombre,passwordEncriptada,fechaCreacion,email];
    const consulta = "INSERT INTO Usuarios VALUES (DEFAULT,$1,$2,$3,$4)";
    await pool.query(consulta,values);
}
module.exports = {
    verificarCredencialesBD,
    registrarUsuarioBD
}