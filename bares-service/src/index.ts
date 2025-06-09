import express from 'express';
import dotenv from 'dotenv';
import barRoutes from './routes/bar.routes';
import pool from './database';

dotenv.config();

const app = express();
const port = 3000; // <--- directamente


app.use(express.json());

// ✅ Usamos el enrutador para el CRUD
app.use('/api/bares', barRoutes);

app.listen(port, '0.0.0.0', () => {
  console.log(`✅ Microservicio de Bares escuchando en http://0.0.0.0:${port}`);
});