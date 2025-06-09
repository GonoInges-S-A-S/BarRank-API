import express from 'express';
import dotenv from 'dotenv';
import imagenRoutes from './routes/imagenesBar.routes'; 
import path from 'path';

dotenv.config();

const app = express();
const port = 3000; // <--- directamente

app.use(express.json());

// Servir archivos estáticos (para acceder a las imágenes cargadas)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Montar rutas del microservicio de imágenes
app.use('/api/imagenes', imagenRoutes);

app.listen(port, '0.0.0.0', () => {
  console.log(`✅ Microservicio de ImagenesBares escuchando en http://0.0.0.0:${port}`);
});