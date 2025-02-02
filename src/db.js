// No puedo extraer directamente de pg, porque funciona con CommonJs
import pg from 'pg'
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from './config.js'

// Creamos la picina de conexcion
export const pool = new pg.Pool({
    user: DB_USER,
    host: DB_HOST,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT
})