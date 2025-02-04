const jwt = require('jsonwebtoken');

const verificarCredencialesMiddleware = (req, res, next) => {
    const { correo, password } = req.body;
    if (!correo || !password) {
        return res.status(401).json({ 
            error: "Credenciales incompletas",
            received: req.body 
        });
    }
    next();
}
module.exports ={
    verificarCredencialesMiddleware
}