const express = require("express");
const { Pool } = require("pg");
require("dotenv").config(); // carga las variables de .env

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración conexión PostgreSQL usando variables .env
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  ssl: {
    rejectUnauthorized: false
  }
});


app.use(express.json());

console.log(pool)
// GET todos los usuarios
app.get("/api/usuarios", async (req, res) => {
  try {
    const result = await pool.query("select * from schemaapi.usuarios;");
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

app.listen(PORT, () => {
  console.log(`API corriendo en http://localhost:${PORT}`);
});
