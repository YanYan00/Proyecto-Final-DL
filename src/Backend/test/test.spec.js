const request = require('supertest');
const server = require('../serverTest.js');
const pool = require('../bd/server.js');

describe('Operacion crud de nanomarket',()=>{
    beforeEach(async () => {
        await pool.query('DELETE FROM Usuarios WHERE correo = $1', ['mateo.rojas@email.com']);
    });
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
    it("Register exitoso devuelve status 201",async()=>{
        const credenciales = {
            correo: "mateo.rojas@email.com",
            password: "123456",
            nombre: "Mateo Rojas"
        }
        const response = await request(server).post("/nanomarket/register").send(credenciales)
        expect(response.status).toBe(201);
    });
    it("Register con correo existente devuelve status 400", async()=>{
        const credenciales ={
            correo: "juan.perez@email.com",
            password: "123456",
            nombre: "Juan Perez"
        }
        const response = await request(server).post("/nanomarket/register").send(credenciales);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error','El correo ya está registrado');
    });
})