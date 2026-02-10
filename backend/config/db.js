import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("proyectoreact_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false
});

// Comprobar conexión
(async () => {
  try {
    await sequelize.authenticate();
    console.log(" Conexión establecida con la base de datos.");
  } catch (error) {
    console.error(" Error al conectar a la base de datos:", error);
  }
})();
