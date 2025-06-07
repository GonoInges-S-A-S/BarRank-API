import express from 'express';
import dotenv from 'dotenv';
import pool from './database';
import reseRoutes from './routes/categoria.routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3003;

app.use(express.json());

app.use('/api/categorias', reseRoutes);

app.listen(port, () => {
  console.log(`✅ Microservicio de categorias corriendo en http://localhost:${port}`);
});