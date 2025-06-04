import express from 'express';
import dotenv from 'dotenv';
import pool from './database';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Ruta de prueba
app.get('/api/bars', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM bares'); // apuntamiento a la tabla 'bares'
    res.json(rows);
  } catch (error) {
    console.error('Error consultando bares:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.listen(port, () => {
  console.log(`✅ Microservicio de Bares escuchando en http://localhost:${port}`);
});
