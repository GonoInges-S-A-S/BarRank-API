import express from 'express';
import dotenv from 'dotenv';
import reseRoutes from './routes/rese.routes';
import pool from './database';

dotenv.config();

const app = express();
const port = 3000; // <--- directamente

app.use(express.json());
app.use('/api/reviews', reseRoutes);

app.listen(port, '0.0.0.0', () => {
  console.log(`✅ Microservicio de Reseñas escuchando en http://0.0.0.0:${port}`);
});
