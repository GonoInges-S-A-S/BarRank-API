import express from 'express';
import {
  getAllBars,
  getBarById,
  createBar,
  updateBar,
  deleteBar,
} from '../controllers/bar.controller';

const router = express.Router();

router.get('/bars', getAllBars);
router.get('/bars/:id', getBarById);
router.post('/bars', createBar);
router.put('/bars/:id', updateBar);
router.delete('/bars/:id', deleteBar);

export default router;
