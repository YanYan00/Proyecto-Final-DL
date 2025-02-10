const pool =require("../bd/server.js")

const obtenerProductosDB = async () => {
    const {rows} = await pool.query('SELECT * FROM productos');
    return rows;
}
const obtenerPerfilDB = async (id) => {
    const consulta = "SELECT nombre, correo FROM Usuarios WHERE idUsuario = $1"
    const { rows, rowCount } = await pool.query(consulta, [id]);
    return rows[0];
}
module.exports ={
    obtenerProductosDB,
    obtenerPerfilDB
};