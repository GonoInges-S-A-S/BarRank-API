import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes';
import pool from './database';

dotenv.config();

const app = express();
const port = 3000; // <--- directamente

app.use(express.json());
// Montar rutas del microservicio de Usuarios
app.use('/api/users', userRoutes);

app.listen(port, '0.0.0.0', () => {
  console.log(`✅ Microservicio de Usuarios escuchando en http://0.0.0.0:${port}`);
});
