const request = require('supertest');
const server = require('../serverTest.js');

describe('Operacion crud de nanomarket',()=>{
    it("Obteniendo los productos con un status 200", async () =>{
        const response = await request(server).get("/nanomarket/productos");
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body[0]).toHaveProperty('sku');
    });
    it("Login exitoso devuelve status 200 y token",async()=>{
        const credenciales = {
            correo: "juan.perez@email.com",
            password:"123456"}
        
        const response = await request(server)
            .post("/nanomarket/login")
            .send(credenciales);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
        expect(response.body).toHaveProperty('user.idUsuario');
    });
})