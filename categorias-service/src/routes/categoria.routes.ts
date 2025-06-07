import { Router } from "express";
import {
  getAllCategorias,
  getCategoriaById,
  createCategoria,
  updateCategoria,
  deleteCategoria,
} from "../controllers/categoria.controller";

const router = Router();

router.get("/", getAllCategorias);
router.get("/:id", getCategoriaById);
router.post("/", createCategoria);
router.put("/:id", updateCategoria);
router.delete("/:id", deleteCategoria);

export default router;
