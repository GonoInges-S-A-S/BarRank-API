// src/middlewares/upload.ts
import multer from 'multer';
import path from 'path';

// Configuración del almacenamiento
const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, 'uploads/'); // Carpeta donde se guardan las imágenes
  },
  filename: function (_req, file, cb) {
  const timestamp = Date.now();
  const ext = path.extname(file.originalname);
  const baseName = path.basename(file.originalname, ext).replace(/\s+/g, '_'); // sin espacios
  cb(null, `${baseName}_${timestamp}${ext}`);
  },
});

// Filtro de archivos opcional: solo imágenes
const fileFilter = (_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten imágenes'));
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
