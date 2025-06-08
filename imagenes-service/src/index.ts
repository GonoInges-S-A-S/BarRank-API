import express from 'express';
import dotenv from 'dotenv';
import imagenRoutes from './routes/imagenesBar.routes'; // Asegúrate de tener este archivo
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 3004; // Puerto diferente si es otro microservicio

app.use(express.json());

// Servir archivos estáticos (para acceder a las imágenes cargadas)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Montar rutas del microservicio de imágenes
app.use('/api/imagenes', imagenRoutes);

app.listen(port, () => {
  console.log(`📸 Microservicio de Imágenes escuchando en http://localhost:${port}`);
});