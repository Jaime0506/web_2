// No puedo extraer directamente de pg, porque funciona con CommonJs
import pg from 'pg'

// Creamos la picina de conexcion
export const pool = new pg.Pool({
    user: 'alumno',
    host: 'localhost',
    password: '123456',
    database: 'course-db',
    port: 5432
})