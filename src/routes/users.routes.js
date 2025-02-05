import { Router } from 'express'
import { addUsers, deleteUsers, getUserById, getUsers, updateUsers } from '../controllers/users.controllers.js'

const router = Router()

// Obtener usuario with or without queries
router.get('/users', getUsers)

// Obtener usuario ID
router.get('/users/:id', getUserById)

// Crear usuario
router.post('/users', addUsers)

// Actualizar usuario
router.put('/users/:id', updateUsers)

// Eliminar un usuario
router.delete('/users/:id', deleteUsers)

export default router