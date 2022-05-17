import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const configuracion = {
    connectionString: process.env.POSTGRESGL_ADDON_URI,
    ssl: { rejectUnauthorized: false }
}

export const pool = new Pool(configuracion)
try {
  console.log("Base de datos correctamente enlazada");
} catch (error) {
  console.log("Erro al conectar la DB");
  console.log(error);
}