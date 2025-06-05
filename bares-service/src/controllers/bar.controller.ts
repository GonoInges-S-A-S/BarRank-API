import { Request, Response } from 'express';
import pool from '../database';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

// Obtener todos los bares
export const getAllBars = async (req: Request, res: Response): Promise<void> => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM bares');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los bares' });
  }
};

// Obtener un bar por ID
export const getBarById = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: 'ID inválido' });
    return;
  }

  try {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM bares WHERE id = ?', [id]);
    if (rows.length === 0) {
      res.status(404).json({ error: 'Bar no encontrado' });
      return;
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el bar' });
  }
};

// Crear un nuevo bar
export const createBar = async (req: Request, res: Response): Promise<void> => {
  const { nombre, direccion, ciudad, descripcion, categoria_id } = req.body;
  try {
    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO bares (nombre, direccion, ciudad, descripcion, categoria_id) VALUES (?, ?, ?, ?, ?)',
      [nombre, direccion, ciudad, descripcion, categoria_id]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el bar' });
  }
};

// Actualizar un bar existente
export const updateBar = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id, 10);
  const { nombre, direccion, ciudad, descripcion, categoria_id } = req.body;

  if (isNaN(id)) {
    res.status(400).json({ error: 'ID inválido' });
    return;
  }

  try {
    const [result] = await pool.query<ResultSetHeader>(
      'UPDATE bares SET nombre = ?, direccion = ?, ciudad = ?, descripcion = ?, categoria_id = ? WHERE id = ?',
      [nombre, direccion, ciudad, descripcion, categoria_id, id]
    );
    res.status(200).json({ message: 'Bar actualizado', affectedRows: result.affectedRows });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el bar' });
  }
};

// Eliminar un bar
export const deleteBar = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    res.status(400).json({ error: 'ID inválido' });
    return;
  }

  try {
    const [result] = await pool.query<ResultSetHeader>(
      'DELETE FROM bares WHERE id = ?', [id]
    );
    res.status(200).json({ message: 'Bar eliminado', affectedRows: result.affectedRows });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar el bar' });
  }
};
