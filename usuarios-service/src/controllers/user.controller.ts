import { Request, Response } from 'express';
import pool from '../database';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

// Obtener todos los usuarios
export const getAllUsers = async (_: Request, res: Response) => {
  const [rows] = await pool.query<RowDataPacket[]>('SELECT id, nombre_usuario, email, password, fecha_registro FROM usuarios');
  res.json(rows);
};

// Obtener usuario por ID
export const getUserById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const [rows] = await pool.query<RowDataPacket[]>('SELECT id, nombre_usuario, email, password, fecha_registro FROM usuarios WHERE id = ?', [id]);
  rows.length ? res.json(rows[0]) : res.status(404).json({ error: 'Usuario no encontrado' });
};

// Crear usuario
export const createUser = async (req: Request, res: Response) => {
  const { nombre_usuario, email, password } = req.body;
  const [result] = await pool.query<ResultSetHeader>(
    'INSERT INTO usuarios (nombre_usuario, email, password) VALUES (?, ?, ?)',
    [nombre_usuario, email, password]
  );
  res.status(201).json({ id: result.insertId });
};

// Actualizar usuario
export const updateUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const { nombre_usuario, email, password } = req.body;
  const [result] = await pool.query<ResultSetHeader>(
    'UPDATE usuarios SET nombre_usuario = ?, email = ?, password = ? WHERE id = ?',
    [nombre_usuario, email, password, id]
  );
  res.json({ message: 'Usuario actualizado', affectedRows: result.affectedRows });
};

// Eliminar usuario
export const deleteUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const [result] = await pool.query<ResultSetHeader>('DELETE FROM usuarios WHERE id = ?', [id]);
  res.json({ message: 'Usuario eliminado', affectedRows: result.affectedRows });
};
