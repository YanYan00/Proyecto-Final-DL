
CREATE DATABASE tienda;

\c tienda;

CREATE TABLE Usuarios (
    idUsuario SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    fechaCrea DATE DEFAULT CURRENT_DATE,
    correo VARCHAR(255) UNIQUE NOT NULL
);


CREATE TABLE Categorias (
    idCategoria SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL UNIQUE
);


CREATE TABLE Productos (
    idProducto SERIAL PRIMARY KEY,
    sku VARCHAR(255) UNIQUE NOT NULL,
    descripcion VARCHAR(255),
    precio INTEGER NOT NULL CHECK (precio >= 0),
    stock INTEGER NOT NULL CHECK (stock >= 0),
    nombre VARCHAR(255) NOT NULL,
    fechaCrea DATE DEFAULT CURRENT_DATE,
    idCategoria INTEGER NOT NULL,
    FOREIGN KEY (idCategoria) REFERENCES Categorias(idCategoria) ON DELETE CASCADE
);


CREATE TABLE Publicaciones (
    idPublicacion SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255),
    precio INTEGER NOT NULL CHECK (precio >= 0),
    fechaCrea DATE DEFAULT CURRENT_DATE,
    idUsuario INTEGER NOT NULL,
    idCategoria INTEGER NOT NULL,
    idProducto INTEGER UNIQUE, 
    FOREIGN KEY (idUsuario) REFERENCES Usuarios(idUsuario) ON DELETE CASCADE,
    FOREIGN KEY (idCategoria) REFERENCES Categorias(idCategoria) ON DELETE CASCADE,
    FOREIGN KEY (idProducto) REFERENCES Productos(idProducto) ON DELETE SET NULL
);

CREATE TABLE Pedidos (
    idPedido SERIAL PRIMARY KEY,
    estado VARCHAR(255) NOT NULL CHECK (estado IN ('pendiente', 'pagado', 'enviado', 'cancelado')),
    precioTotal INTEGER NOT NULL CHECK (precioTotal >= 0),
    fechaCrea DATE DEFAULT CURRENT_DATE,
    idUsuario INTEGER NOT NULL,
    FOREIGN KEY (idUsuario) REFERENCES Usuarios(idUsuario) ON DELETE CASCADE
);


CREATE TABLE Detalles (
    idDetalle SERIAL PRIMARY KEY,
    cantidad INTEGER NOT NULL CHECK (cantidad > 0),
    precio INTEGER NOT NULL CHECK (precio >= 0),
    idPedido INTEGER NOT NULL,
    idProducto INTEGER NOT NULL,
    FOREIGN KEY (idPedido) REFERENCES Pedidos(idPedido) ON DELETE CASCADE,
    FOREIGN KEY (idProducto) REFERENCES Productos(idProducto) ON DELETE CASCADE
);


CREATE TABLE Carritos (
    idCarrito SERIAL PRIMARY KEY,
    cantidad INTEGER NOT NULL CHECK (cantidad > 0),
    idUsuario INTEGER NOT NULL UNIQUE,  -- Cada usuario tiene un solo carrito
    idProducto INTEGER NOT NULL,
    FOREIGN KEY (idUsuario) REFERENCES Usuarios(idUsuario) ON DELETE CASCADE,
    FOREIGN KEY (idProducto) REFERENCES Productos(idProducto) ON DELETE CASCADE
);
