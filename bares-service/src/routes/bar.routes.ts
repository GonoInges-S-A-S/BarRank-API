import express from 'express';
import {
  getAllBars,
  getBarById,
  createBar,
  updateBar,
  deleteBar,
} from '../controllers/bar.controller';

const router = express.Router();

router.get('/', getAllBars);
router.get('/:id', getBarById);
router.post('/', createBar);
router.put('/:id', updateBar);
router.delete('/:id', deleteBar);

export default router;
