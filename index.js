const express = require("express");
const cors = require("cors");
const pool = require("./conexionDB"); // tu conexión a PostgreSQL

const app = express();
app.use(express.json());

// Configuración de CORS
app.use(cors({
  origin: true,
  credentials: true
}));

// ---------- ENDPOINTS ----------

// 1️ GET ALL - obtener todos los conductores
app.get("/conductores", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM CONDUCTORES");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2️ GET por licencia
app.get("/conductores/licencia/:licencia", async (req, res) => {
  const { licencia } = req.params;
  try {
    const result = await pool.query("SELECT * FROM CONDUCTORES WHERE LICENCIA = $1", [licencia]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Conductor no encontrado" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3️ DELETE por ID
app.delete("/conductores/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM CONDUCTORES WHERE ID = $1", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Conductor no encontrado" });
    }
    res.json({ message: "Conductor eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------- Servidor ----------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));