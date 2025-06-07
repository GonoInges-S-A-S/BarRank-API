import express from 'express';
import {
  getAllCalificaciones,
  getCalificacionById,
  createCalificacion,
  updateCalificacion,
  deleteCalificacion
} from '../controllers/rese.controller';

const router = express.Router();

router.get('/', getAllCalificaciones);
router.get('/:id', getCalificacionById);
router.post('/', createCalificacion);
router.put('/:id', updateCalificacion);
router.delete('/:id', deleteCalificacion);

export default router;
