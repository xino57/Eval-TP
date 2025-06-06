import express from 'express'
import { getItems, getItem, patchItem, postItem, deleteItem } from '../controllers/facture.mjs'

const router = express.Router()

router.get('/', getItems)
router.get('/:id', getItem)
router.post('/', postItem)
router.patch('/:id', patchItem)
router.delete('/:id', deleteItem)

export default router
