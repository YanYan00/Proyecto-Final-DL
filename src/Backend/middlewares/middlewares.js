const jwt = require('jsonwebtoken');

const verificarCredencialesMiddleware = (req, res, next) => {
    console.log('Body recibido en middleware:', req.body);
    const { correo, password } = req.body;

    if (!correo || !password) {
        console.log('Credenciales faltantes:', { correo, password });
        return res.status(401).json({ 
            error: "Credenciales incompletas",
            received: req.body 
        });
    }
    
    console.log('Middleware validación exitosa');
    next();
}
module.exports ={
    verificarCredencialesMiddleware
}