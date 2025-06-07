import express from 'express';
import dotenv from 'dotenv';
import pool from './database';
import reseRoutes from './routes/rese.routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3002;

app.use(express.json());

app.use('/api/reviews', reseRoutes);

app.listen(port, () => {
  console.log(`✅ Microservicio de Reseñas corriendo en http://localhost:${port}`);
});
