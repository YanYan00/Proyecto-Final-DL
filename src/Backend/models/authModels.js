const pool = require('../bd/server.js')
const bcrypt = require('bcryptjs')


const verificarCredencialesBD = async (correo, password) => {
    try {
        const consulta = "SELECT * FROM Usuarios WHERE correo = $1";
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

module.exports = {
    verificarCredencialesBD
}