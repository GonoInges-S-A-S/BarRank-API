import express from 'express';
import dotenv from 'dotenv';
import barRoutes from './routes/bar.routes'; // Usa el nombre que tú definiste
import pool from './database';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// ✅ Usamos el enrutador para el CRUD
app.use('/api/bares', barRoutes);

// ✅ Ruta de prueba de conexión a la DB (opcional)
/*app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.status(200).json({ status: 'OK', message: 'Conexión exitosa a la base de datos' });
  } catch (error) {
    console.error('❌ Error conectando a la DB:', error);
    res.status(500).json({ status: 'FAIL', error: 'Error de conexión a la base de datos' });
  }
});*/

app.listen(port, () => {
  console.log(`✅ Microservicio de Bares escuchando en http://localhost:${port}`);
});
