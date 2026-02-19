# 🎬 Proyecto Cine - Full Stack (React + Node.js)

Este proyecto es una aplicación de gestión de cartelera de cine que incluye autenticación de usuarios, protección de rutas y conexión a base de datos MySQL.

---

## 🛠️ 1. Configuración del Backend (.env)

Para que el servidor pueda conectarse a tu base de datos local (XAMPP/MySQL), debes crear un archivo de configuración ambiental.

1. Ve a la carpeta `/backend`.
2. Crea un archivo nuevo y nómbralo exactamente `.env`.
3. Pega el siguiente código dentro:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=proyectoreact_db
PORT=3000
```
## 2. Usuarios
('admin', 'admin@cine.com', '123'),
('usuario1', 'user1@cine.com', '123');

##3.Instalar depedencias e iniciar
Tener abierto xampp con SQL y apache, entrar en phpmyadmin crear un database con el .sql
Entrar en backend y proyecto-react y suar npx npm install
Luego para inicar backend node server.js y luego en el proyecto-react usar npm start
