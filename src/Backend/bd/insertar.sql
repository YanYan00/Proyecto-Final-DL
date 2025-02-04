INSERT INTO Categorias (nombre) VALUES
    ('Electrónica'),
    ('Ropa'),
    ('Hogar'),
    ('Deportes'),
    ('Juguetes');
--- Al loguearse ocupar contraseña 123456 con cualquier usuario ya que es la contraseña hasheada que estan aqui guardadas o crear una nueva en su defecto y hacer un update con la nueva contraseña
INSERT INTO Usuarios (nombre, password, correo) VALUES
    ('Juan Pérez', '$2a$12$r5cvlQani3fdDgybNysU..v.EdPJJu.PsS6nUUiFrAs6qwgo3m3vS', 'juan.perez@email.com'),
    ('María González', '$2a$12$r5cvlQani3fdDgybNysU..v.EdPJJu.PsS6nUUiFrAs6qwgo3m3vS', 'maria.gonzalez@email.com'),
    ('Pedro López', '$2a$12$r5cvlQani3fdDgybNysU..v.EdPJJu.PsS6nUUiFrAs6qwgo3m3vS', 'pedro.lopez@email.com');

INSERT INTO Productos (sku, descripcion, precio, stock, nombre, idCategoria) VALUES
    ('ELEC001', 'Smartphone Android 128GB', 299990, 10, 'Smartphone X', 1),
    ('ELEC002', 'Laptop Intel Core i7', 799990, 5, 'Laptop Pro', 1),
    ('ROPA001', 'Polera de algodón azul', 14990, 50, 'Polera Azul', 2),
    ('HOG001', 'Cafetera automática', 59990, 20, 'Cafetera Premium', 3),
    ('DEP001', 'Pelota de fútbol profesional', 39990, 15, 'Pelota FIFA', 4),
    ('JUG001', 'Lego Star Wars', 79990, 8, 'Lego Millenium Falcon', 5);


INSERT INTO Publicaciones (titulo, descripcion, precio, idUsuario, idCategoria, idProducto) VALUES
    ('Venta de Smartphone X', 'Vendo celular nuevo en caja, garantía incluida.', 299990, 1, 1, 1),
    ('Laptop Pro en oferta', 'Laptop de alta gama con SSD de 512GB.', 749990, 2, 1, 2),
    ('Polera Azul algodón', '100% algodón, diferentes tallas disponibles.', 14990, 3, 2, 3),
    ('Cafetera Premium', 'Prepara el mejor café en segundos.', 59990, 1, 3, 4);


INSERT INTO Pedidos (estado, precioTotal, idUsuario) VALUES
    ('pendiente', 149990, 1),
    ('pagado', 39990, 2),
    ('enviado', 79990, 3);


INSERT INTO Detalles (cantidad, precio, idPedido, idProducto) VALUES
    (1, 149990, 1, 1),
    (2, 19995, 2, 3),
    (1, 79990, 3, 6);


INSERT INTO Carritos (cantidad, idUsuario, idProducto) VALUES
    (1, 1, 2),
    (2, 2, 5),
    (1, 3, 4);
