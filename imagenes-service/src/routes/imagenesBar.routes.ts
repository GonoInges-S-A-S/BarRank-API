import { Router } from 'express';
import upload from '../middlewares/upload';
import {
  getAllImagenes,
  getImagenesByBarId,
  subirImagen,
  updateImagen,
  deleteImagen
} from '../controllers/imagenesBar.controller';

const router = Router();

// Obtener todas las imágenes
router.get('/', getAllImagenes);

// Obtener imágenes por bar_id
router.get('/bar/:barId', getImagenesByBarId);

// Subir nueva imagen con archivo (usa multer)
router.post('/', upload.single('imagen'), subirImagen);

// Actualizar imagen (requiere id en URL)
router.put('/:id', updateImagen);

// Eliminar imagen (requiere id en URL)
router.delete('/:id', deleteImagen);

export default router;
