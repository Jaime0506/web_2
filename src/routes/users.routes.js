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

        if (rows.length === 0) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        return res.json(rows[0])
    } catch (error) {
        console.log(error)
    }
})

// Crear usuario
router.post('/users', async (req, res) => {
    const { first_name, last_name, phone, address } = req.body
    const sql = `INSERT INTO users(first_name, last_name, phone, address) 
                VALUES ($1, $2, $3, $4)`
    const values = [first_name, last_name, phone, address]

    try {
        const result = await pool.query(sql, values)
        const { rowCount } =  result

        // En las operaciones de INSERT y DELETE x defecto
        // no se retorna nada en las rows, pero podemos verificar
        // que si se realizo una operacion con el rowCount, ya que
        // si la operacion logra efectuar cambios, se vera reflejado ahi.
        if (rowCount === 0) {
            return res.status(404).json({
                message: 'No se pudo'
            })
        }

        return res.sendStatus(204)
    } catch (error) {
        console.log(error)
    }
})

// Actualizar usuario
router.put('/users/:id', async (req, res) => {
    const { id } = req.params
    const { first_name, last_name, phone, address } = req.body

    console.log(id, req.body)

    const sql = 'UPDATE users SET first_name = $1, last_name = $2, phone = $3, address = $4 WHERE (id = $5) RETURNING *'
    const values = [first_name, last_name, phone, address, id]
    
    try {
        const result = await pool.query(sql, values)
        const { rows, rowCount } = result
        
        if (rowCount === 0) {
            return res.status(404).json({
                messae: 'User not found'
            })
        }

        return res.json(rows[0])

    } catch (error) {
        console.log(error)
    }
})

// Eliminar un usuario
router.delete('/users/:id', async (req, res) => {
    const { id } = req.params

    try {
        const result = await pool.query('DELETE FROM users WHERE (id = $1)', [id])
        const { rowCount } = result

        if (rowCount === 0) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        return res.sendStatus(204)
    } catch (error) {
        console.log(error)
    }
})

export default router