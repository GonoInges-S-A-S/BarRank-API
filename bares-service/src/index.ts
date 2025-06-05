import express from 'express';
import dotenv from 'dotenv';
import barRoutes from './routes/bar.routes';
import pool from './database';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// ✅ Usamos el enrutador para el CRUD
app.use('/api/bares', barRoutes);

app.listen(port, () => {
  console.log(`✅ Microservicio de Bares escuchando en http://localhost:${port}`);
});
