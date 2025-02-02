import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
    res.send('Obteniendo usuarios')
})

export default router