-- ===========================
-- BASE DE DATOS: proyectoreact_db
-- ===========================
CREATE DATABASE IF NOT EXISTS proyectoreact_db;
USE proyectoreact_db;

-- ===========================
-- TABLA USUARIOS
-- ===========================
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_usuario VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    rol VARCHAR(20) NOT NULL DEFAULT 'usuario', -- 'usuario' o 'admin'
    creado_en DATETIME DEFAULT CURRENT_TIMESTAMP,
    actualizado_en DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ===========================
-- TABLA TITULOS (PELÍCULAS Y SERIES)
-- ===========================
CREATE TABLE titulos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    tipo ENUM('pelicula','serie') NOT NULL,
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
CREATE TABLE generos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

-- ===========================
-- TABLA INTERMEDIA TITULOS ↔ GENEROS
-- ===========================
CREATE TABLE titulos_generos (
    id_titulo INT NOT NULL,
    id_genero INT NOT NULL,
    PRIMARY KEY (id_titulo, id_genero),
    FOREIGN KEY (id_titulo) REFERENCES titulos(id) ON DELETE CASCADE,
    FOREIGN KEY (id_genero) REFERENCES generos(id) ON DELETE CASCADE
);

-- ===========================
-- TABLA COMENTARIOS / RESEÑAS
-- ===========================
CREATE TABLE comentarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_titulo INT NOT NULL,
    id_usuario INT NOT NULL,
    contenido TEXT NOT NULL,
    creado_en DATETIME DEFAULT CURRENT_TIMESTAMP,
    actualizado_en DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_titulo) REFERENCES titulos(id) ON DELETE CASCADE,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- ===========================
-- TABLA VALORACIONES
-- ===========================
CREATE TABLE valoraciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_titulo INT NOT NULL,
    id_usuario INT NOT NULL,
    puntuacion INT CHECK (puntuacion >= 1 AND puntuacion <= 5),
    creado_en DATETIME DEFAULT CURRENT_TIMESTAMP,
    actualizado_en DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_titulo) REFERENCES titulos(id) ON DELETE CASCADE,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- ===========================
-- TABLA EPISODIOS (SOLO PARA SERIES)
-- ===========================
CREATE TABLE episodios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_titulo INT NOT NULL,
    temporada INT NOT NULL,
    numero_episodio INT NOT NULL,
    titulo VARCHAR(150),
    descripcion TEXT,
    fecha_estreno DATE,
    FOREIGN KEY (id_titulo) REFERENCES titulos(id) ON DELETE CASCADE
);

-- ===========================
-- DATOS DE EJEMPLO
-- ===========================

-- Usuarios de prueba
INSERT INTO usuarios (nombre_usuario, email, contrasena, rol) VALUES
('admin', 'admin@cine.com', 'hashed_password_aqui', 'admin'),
('usuario1', 'user1@cine.com', 'hashed_password_aqui', 'usuario');

-- Géneros de ejemplo
INSERT INTO generos (nombre) VALUES
('Acción'),
('Comedia'),
('Drama'),
('Terror'),
('Ciencia Ficción'),
('Animación'),
('Romance');
