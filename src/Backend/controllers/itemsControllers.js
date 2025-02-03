const pool = require("../bd/server.js")

const getProductos = async (req, res) => {
    try {
        const query = 'SELECT * FROM Productos';
        const { rows } = await pool.query(query);
        res.json(rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error al obtener productos' });
    }
};

module.exports = {
    getProductos
};