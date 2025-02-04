const {getProductos} = require('./controllers/itemsControllers.js')
const express = require('express')
const app = express()
const cors = require('cors')
const {login, register} = require('./controllers/authController.js')
const {verificarCredencialesMiddleware} = require('./middlewares/middlewares.js')
app.use(cors())
app.use(express.json())

app.listen(3000,console.log('Servidor encendido en puerto 3000'))

app.get('/api/productos', async (req, res) => {
    await getProductos(req, res);
});

app.post('/api/login',verificarCredencialesMiddleware,async(req,res) =>{
    await login(req,res);
});
app.post('/api/register',async(req,res)=>{
    await register(req,res)
})