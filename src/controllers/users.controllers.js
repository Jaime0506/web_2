import { pool } from "../db.js"

export const getUserById = async (req, res) => {
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
}

export const addUsers = async (req, res) => {
    const { first_name, last_name, phone, address } = req.body
    const sql = `INSERT INTO users(first_name, last_name, phone, address) 
                VALUES ($1, $2, $3, $4) RETURNING *`
    const values = [first_name, last_name, phone, address]

    try {
        const result = await pool.query(sql, values)
        const { rowCount, rows } =  result

        // En las operaciones de INSERT y DELETE x defecto
        // no se retorna nada en las rows, pero podemos verificar
        // que si se realizo una operacion con el rowCount, ya que
        // si la operacion logra efectuar cambios, se vera reflejado ahi.
        if (rowCount === 0) {
            return res.status(404).json({
                message: 'No se pudo'
            })
        }

        return res.json(rows[0])
    } catch (error) {
        console.log(error)
    }
}

export const updateUsers = async (req, res) => {
    const { id } = req.params
    const fields = req.body

    if (Object.keys(fields).length === 0) {
        return res.status(400).json({ message: 'No fields provided for update' });
    }

    const setClauses = []
    const values = []
    let index = 1

    for(const [key, value] of Object.entries(fields)) {
        if (value !== undefined && value.length > 0) {
            setClauses.push(`${key} = $${index++}`)
            values.push(value)
        }
    }

    if (setClauses.length === 0) {
        return res.status(400).json({ message: 'No valid fields to update' })
    }

    values.push(id)

    const sql = `UPDATE users set ${setClauses.join(', ')} WHERE id = $${index} RETURNING *`
    
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
}

export const deleteUsers = async (req, res) => {
    const { id } = req.params

    try {
        const result = await pool.query('DELETE FROM users WHERE (id = $1) RETURNING *', [id])
        const { rows, rowCount } = result

        if (rowCount === 0) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        return res.json(rows[0])
    } catch (error) {
        console.log(error)
    }
}

export const getUsers = async (req, res) => {
    const { id, first_name, last_name, phone, address } = req.query

    try {

        // Para cuando no se mandan queries en la peticion
        if (Object.keys(req.query).length === 0) {
            const result = await pool.query('SELECT * FROM users')
            const { rows } = result

            return res.json(rows)
        }

        let conditions = []
        let values = []
        let index = 1

        if (id) {
            conditions.push(`id = $${index++}`)
            values.push(id)
        }

        if (first_name) {
            conditions.push(`first_name ILIKE $${index++}`)
            values.push(`%${first_name}%`)
        }

        if (last_name) {
            conditions.push(`last_name ILIKE $${index++}`)
            values.push(`%${last_name}%`)
        }

        if (phone) {
            conditions.push(`phone ILIKE $${index++}`)
            values.push(`%${phone}%`)
        }

        if (address) {
            conditions.push(`address ILIKE $${index++}`)
            values.push(`%${address}%`)
        }

        if (conditions.length === 0) {
            return res.status(400).json({
                message: "Not criterias for the search"
            })
        }

        const sql = `SELECT * FROM users WHERE ${conditions.join(' AND ')}`
        const result = await pool.query(sql, values)

        const { rows } = result

        if (rows.length === 0) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        return res.json(rows)
    } catch (error) {
        console.log(error)
    }
}