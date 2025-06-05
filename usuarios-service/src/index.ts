import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes';
import pool from './database';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// ✅ Usamos el enrutador para el CRUD
app.use('/api/users', userRoutes);

app.listen(port, () => {
  console.log(`✅ Microservicio de Usuarios escuchando en http://localhost:${port}`);
});
