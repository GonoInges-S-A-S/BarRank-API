import { Request, Response } from 'express';
import pool from '../database';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import path from 'path';

// Obtener todas las imágenes
export const getAllImagenes = async (_: Request, res: Response) => {
  const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM imagenes_bar');
  res.json(rows);
};

// Obtener imágenes por bar_id
export const getImagenesByBarId = async (req: Request, res: Response) => {
  const barId = parseInt(req.params.barId, 10);
  const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM imagenes_bar WHERE bar_id = ?', [barId]);
  res.json(rows);
};

// Crear nueva imagen con carga de archivo
export const subirImagen = async (req: Request, res: Response): Promise<void> => {
  try {
    const { bar_id, descripcion } = req.body;
    const archivo = req.file;

    if (!archivo) {
      res.status(400).json({ error: 'No se subió ninguna imagen' });
      return;
    }

    const url_imagen = `/uploads/${archivo.filename}`;

    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO imagenes_bar (bar_id, url_imagen, descripcion) VALUES (?, ?, ?)',
      [bar_id, url_imagen, descripcion]
    );

    res.status(201).json({ id: result.insertId, url_imagen });
  } catch (error) {
    console.error('Error al subir imagen:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Actualizar imagen existente
export const updateImagen = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const { url_imagen, descripcion } = req.body;
  const [result] = await pool.query<ResultSetHeader>(
    'UPDATE imagenes_bar SET url_imagen = ?, descripcion = ? WHERE id = ?',
    [url_imagen, descripcion, id]
  );
  res.json({ message: 'Imagen actualizada', affectedRows: result.affectedRows });
};

// Eliminar imagen
export const deleteImagen = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const [result] = await pool.query<ResultSetHeader>('DELETE FROM imagenes_bar WHERE id = ?', [id]);
  res.json({ message: 'Imagen eliminada', affectedRows: result.affectedRows });
};
