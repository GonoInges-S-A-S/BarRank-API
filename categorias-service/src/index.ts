import express from 'express';
import dotenv from 'dotenv';
import pool from './database';
import reseRoutes from './routes/categoria.routes';

dotenv.config();

const app = express();
const port = 3000; // <--- directamente

app.use(express.json());

app.use('/api/categorias', reseRoutes);

app.listen(port, '0.0.0.0', () => {
  console.log(`✅ Microservicio de categorias escuchando en http://0.0.0.0:${port}`);
});