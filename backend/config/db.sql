-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS registro_db;
USE registro_db;

-- Crear tabla de registros
CREATE TABLE IF NOT EXISTS registros (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  nacionalidad VARCHAR(50) NOT NULL,
  fecha DATE NOT NULL,
  hora TIME NOT NULL,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insertar algunos datos de ejemplo
INSERT INTO registros (nombre, nacionalidad, fecha, hora) VALUES
  ('María González', 'México', '2025-03-15', '09:30:45'),
  ('John Smith', 'Estados Unidos', '2025-03-16', '14:22:18'),
  ('Akira Tanaka', 'Japón', '2025-03-17', '11:05:37'),
  ('Carlos Rodríguez', 'España', '2025-03-17', '16:45:52'),
  ('Ana Silva', 'Brasil', '2025-03-18', '08:15:09');

-- Crear tabla de usuarios (para autenticación si la necesitas)
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre_usuario VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  nombre_completo VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  rol ENUM('admin', 'usuario') DEFAULT 'usuario',
  activo BOOLEAN DEFAULT true,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);