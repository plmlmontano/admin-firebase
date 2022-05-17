import { Request, Response } from "express";
import { pool } from "../db/config";

// TODO: toca cambiar esto
export const get = async (req: Request, res: Response): Promise<Response> => {
    let cliente = await pool.connect();
    try {
        const response = await cliente.query("SELECT * FROM adm.usuarios");
        return res.status(200).json(response.rows);
    } catch (error) {
        console.log(error);
        return res.status(500).json("Internal server error");
    } finally {
        cliente.release(true);
    }
}

// TODO: toca cambiar esto
export const create = async (req: Request, res: Response): Promise<Response> => {
    let cliente = await pool.connect();
    try {
        const data = req.body;
        const query = await cliente.query("INSERT INTO adm.usuarios (documento, tipo_documento, nombres, apellidos, contrasena, correo, telefono_celular, genero, fecha_nacimiento) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)", [data.documento, data.tipo_documento, data.nombres, data.apellidos, data.contrasena, data.correo, data.telefono_celular, data.genero, data.fecha_nacimiento]);

        let response = res.status(200);

        if (query.rowCount > 0) {
            response = res.status(200).json("Usuario creado");
        } else {
            response = res.status(400).json("No se creó ningún usuario");
        }

        return response;
    } catch (error) {
        console.log(error);
        return res.status(500).json("Internal server error");
    } finally {
        cliente.release(true);
    }
}


// TODO: toca cambiar esto
export const update = async (req: Request, res: Response): Promise<Response> => {
    let cliente = await pool.connect();
    try {
        const { id } = req.params;
        const data = req.body;
        const query = await cliente.query("UPDATE adm.usuarios SET documento = $1, tipo_documento = $2, nombres = $3, apellidos = $4, correo = $5, telefono_celular = $6, genero = $7, fecha_nacimiento = $8  WHERE id = $9", [data.documento, data.tipo_documento, data.nombres, data.apellidos, data.contrasena, data.correo, data.telefono_celular, data.genero, data.fecha_nacimiento, id]);
        let response: Response = res.status(200)
        if (query.rowCount > 0) {
            response = res.status(200).json("Usuario actualizado");
        } else {
            response = res.status(404).json("No se actualizó ningún usuario");
        }
        return response;
    } catch (error) {
        console.log(error);
        return res.status(500).json("Internal server error");
    } finally {
        cliente.release(true);
    }
}

// TODO: toca cambiar esto
export const deleteById = async (req: Request, res: Response): Promise<Response> => {
    let cliente = await pool.connect();
    try {
        const { id } = req.params;
        const query = await cliente.query("DELETE FROM adm.usuarios WHERE id = $1", [id]);

        let response = res.status(200);

        if (query.rowCount > 0) {
            response = res.status(200).json("Usuario eliminado");
        } else {
            response = res.status(404).json("No se eliminó ningún usuario");
        }

        return response;
    } catch (error) {
        console.log(error);
        return res.status(500).json("Internal server error");
    } finally {
        cliente.release(true);
    }
}