import express from 'express'
import { getAllnotes, getsinglenote, postnote, updatenote, deletenote, favoritenote } from '../controller/controller.js'
const router = express.Router()
router.get('/', getAllnotes)
router.get('/:id', getsinglenote)
router.post('/', postnote)
router.put('/:id', updatenote)
router.delete('/:id', deletenote)
router.patch('/:id/favorite', favoritenote)
export default router