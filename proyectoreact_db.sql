-- ===========================
-- BASE DE DATOS: proyectoreact_db
-- ===========================
CREATE DATABASE IF NOT EXISTS proyectoreact_db;
USE proyectoreact_db;

-- ===========================
-- TABLA USUARIOS
-- ===========================
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_usuario VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    rol VARCHAR(20) NOT NULL DEFAULT 'usuario',
    creado_en DATETIME DEFAULT CURRENT_TIMESTAMP,
    actualizado_en DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ===========================
-- TABLA PELICULAS
-- ===========================
CREATE TABLE IF NOT EXISTS peliculas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    descripcion TEXT,
    fecha_estreno DATE,
    url_poster VARCHAR(255),
    creado_por INT,
    creado_en DATETIME DEFAULT CURRENT_TIMESTAMP,
    actualizado_en DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (creado_por) REFERENCES usuarios(id) ON DELETE SET NULL
);

-- ===========================
-- TABLA GENEROS
-- ===========================
CREATE TABLE IF NOT EXISTS generos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

-- ===========================
-- TABLA INTERMEDIA PELICULAS ↔ GENEROS
-- ===========================
CREATE TABLE IF NOT EXISTS peliculas_generos (
    id_pelicula INT NOT NULL,
    id_genero INT NOT NULL,
    PRIMARY KEY (id_pelicula, id_genero),
    FOREIGN KEY (id_pelicula) REFERENCES peliculas(id) ON DELETE CASCADE,
    FOREIGN KEY (id_genero) REFERENCES generos(id) ON DELETE CASCADE
);

-- ===========================
-- TABLA COMENTARIOS
-- ===========================
CREATE TABLE IF NOT EXISTS comentarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_pelicula INT NOT NULL,
    id_usuario INT NOT NULL,
    contenido TEXT NOT NULL,
    creado_en DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_pelicula) REFERENCES peliculas(id) ON DELETE CASCADE,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- ===========================
-- DATOS DE EJEMPLO (SOLO USUARIOS Y GÉNEROS)
-- ===========================

-- 1. Limpiar y Crear Usuarios (Password: 123)
DELETE FROM usuarios WHERE email IN ('admin@cine.com', 'user1@cine.com');
INSERT INTO usuarios (nombre_usuario, email, contrasena, rol) VALUES
('admin', 'admin@cine.com', '123', 'admin'),
('usuario1', 'user1@cine.com', '123', 'usuario');

-- 2. Insertar Géneros
INSERT IGNORE INTO generos (nombre) VALUES
('Acción'), 
('Comedia'), 
('Drama'), 
('Terror'), 
('Ciencia Ficción'),
('Romance'),
('Animación');