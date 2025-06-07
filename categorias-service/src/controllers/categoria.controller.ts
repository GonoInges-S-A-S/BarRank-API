import { Request, Response } from 'express';
import pool from '../database';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

// Obtener todas las categorías
export const getAllCategorias = async (_: Request, res: Response) => {
  const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM categorias');
  res.json(rows);
};

// Obtener categoría por ID
export const getCategoriaById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM categorias WHERE id = ?', [id]);
  rows.length ? res.json(rows[0]) : res.status(404).json({ error: 'Categoría no encontrada' });
};

// Crear categoría
export const createCategoria = async (req: Request, res: Response) => {
  const { nombre } = req.body;
  const [result] = await pool.query<ResultSetHeader>(
    'INSERT INTO categorias (nombre) VALUES (?)',
    [nombre]
  );
  res.status(201).json({ id: result.insertId });
};

// Actualizar categoría
export const updateCategoria = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const { nombre } = req.body;
  const [result] = await pool.query<ResultSetHeader>(
    'UPDATE categorias SET nombre = ? WHERE id = ?',
    [nombre, id]
  );
  res.json({ message: 'categoria actualizado', affectedRows: result.affectedRows });
};

// Eliminar categoría
export const deleteCategoria = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const [result] = await pool.query<ResultSetHeader>(
    'DELETE FROM categorias WHERE id = ?',
    [id]
  );
  res.json({ message: 'Categoría eliminada', affectedRows: result.affectedRows });
};
