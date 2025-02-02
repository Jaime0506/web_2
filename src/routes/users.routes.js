import { Router } from 'express'
import { pool } from '../db.js'

const router = Router()

// Obtener todos los usuarios
router.get('/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users')
        const { rows } = result
        res.json(rows)
    } catch (error) {
        console.log(error)
    }
})

// Obtener usuario ID
router.get('/users/:id', async (req, res) => {
    const { id } = req.params

    try {
        const result = await pool.query('SELECT * FROM users WHERE (id = $1)', [id])
        const { rows } = result
        res.json(rows)
    } catch (error) {
        console.log(error)
    }
})

// Crear usuario
router.post('/users/', async (req, res) => {
    const { first_name, last_name, phone, address } = req.body

    const sql = `INSERT INTO users(first_name, last_name, phone, address) 
                VALUES ($1, $2, $3, $4)`
    const values = [first_name, last_name, phone, address]

    try {
        const result = await pool.query(sql, values)
        console.log(result)
        res.json(result.rows)

    } catch (error) {
        console.log(error)
    }
})

// Actualizar usuario
router.put('/users/:id', async (req, res) => {
    res.send("Actualizar usuario")
})

// Eliminar un usuario
router.delete('/users/:id', async (req, res) => {
    res.send("Eliminar usuario")
})

export default router