import { Request, Response } from 'express';
import pool from '../database';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

// Obtener todas las calificaciones
export const getAllCalificaciones = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM calificaciones');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener las calificaciones' });
  }
};

// Obtener una calificación por ID
export const getCalificacionById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  try {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM calificaciones WHERE id = ?', [id]);
    if (rows.length === 0) {
      res.status(404).json({ error: 'No se encontró la calificación' });
      return;
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener la calificación' });
  }
};

// Crear una nueva calificación
export const createCalificacion = async (req: Request, res: Response) => {
  const { usuario_id, bar_id, puntuacion_comodidad, puntuacion_ambiente, puntuacion_servicio, comentario } = req.body;

  try {
    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO calificaciones (usuario_id, bar_id, puntuacion_comodidad, puntuacion_ambiente, puntuacion_servicio, comentario) VALUES (?, ?, ?, ?, ?, ?)',
      [usuario_id, bar_id, puntuacion_comodidad, puntuacion_ambiente, puntuacion_servicio, comentario]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: 'Error al crear la calificación' });
  }
};

// Actualizar calificación
export const updateCalificacion = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const { puntuacion_comodidad, puntuacion_ambiente, puntuacion_servicio, comentario } = req.body;

  try {
    const [result] = await pool.query<ResultSetHeader>(
      'UPDATE calificaciones SET puntuacion_comodidad = ?, puntuacion_ambiente = ?, puntuacion_servicio = ?, comentario = ? WHERE id = ?',
      [puntuacion_comodidad, puntuacion_ambiente, puntuacion_servicio, comentario, id]
    );
    res.status(200).json({ message: 'Calificación actualizada', affectedRows: result.affectedRows });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar la calificación' });
  }
};

// Eliminar calificación
export const deleteCalificacion = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);

  try {
    const [result] = await pool.query<ResultSetHeader>(
      'DELETE FROM calificaciones WHERE id = ?', [id]
    );
    res.status(200).json({ message: 'Calificación eliminada', affectedRows: result.affectedRows });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar la calificación' });
  }
};
