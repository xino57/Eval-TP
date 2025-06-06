import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'

const getItems = async (req, res) => {
  try {

    const data = await fs.promises.readFile('./db/facture.json', 'utf8')

    const list = JSON.parse(data)

    res.json(list)

  } catch (err) {

    console.log(err)
    res.status(500).json({ error: true, message: 'Error reading file' })
  }
}

const getItem = async (req, res) => {
  try {

    const data = await fs.promises.readFile('./db/facture.json', 'utf8')

    const list = JSON.parse(data)


    const item = list.find(item => item.id == req.params.id)

    if (!item) {
      res.status(404).json({ error: true, message: 'Facture not found' })
      return
    }

    res.json(item)
  } catch (err) {

    console.log(err)
    res.status(500).json({ error: true, message: 'Error reading file' })
  }
}

const patchItem = async (req, res) => {
  try {

    const data = await fs.promises.readFile('./db/facture.json', 'utf8')

    const list = JSON.parse(data)


    const itemToEdit = list.find(item => item.id == req.params.id)
    if (!itemToEdit) {
      res.status(404).json({ error: true, message: 'Facture not found' })
      return
    }

    const itemToSave = {
      ...itemToEdit,
      ...req.body
    }

    const listToSave = list.map(item => item.id == req.params.id ? itemToSave : item)

    await fs.promises.writeFile('./db/facture.json', JSON.stringify(listToSave))


    res.json(itemToSave)
  } catch (err) {

    console.log(err)
    res.status(500).json({ error: true, message: 'Error reading file' })
  }
}

const postItem = async (req, res) => {
  try {

    const data = await fs.promises.readFile('./db/facture.json', 'utf8')

    const list = JSON.parse(data)

    const itemToSave = {
      ...req.body
    }

    itemToSave.id = Math.floor(100000000 + Math.random() * 900000000)

    console.log(itemToSave)

    if (!itemToSave.description || itemToSave.description.trim().length < 5) {
      res.status(400).json({ error: true, message: 'Missing description or description too short (minimum 5 characters)' })
      return
    }

    if (!itemToSave.client || itemToSave.client.trim().length < 2) {
      res.status(400).json({ error: true, message: 'Missing client or client too short (minimum 2 characters)' })
      return
    }


    if (!itemToSave.prestation || itemToSave.prestation.trim().length < 2) {
      res.status(400).json({ error: true, message: 'Missing prestation or prestation too short (minimum 2 characters)' })
      return
    }


    if (!itemToSave.montantHT || itemToSave.montantHT <= 0) {
      res.status(400).json({ error: true, message: 'Missing montantHT or montantHT must be greater than 0' })
      return
    }


    if (!itemToSave.montantTTC || itemToSave.montantTTC <= 0) {
      res.status(400).json({ error: true, message: 'Missing montantTTC or montantTTC must be greater than 0' })
      return
    }


    if (itemToSave.montantTTC <= itemToSave.montantHT) {
      res.status(400).json({ error: true, message: 'montantTTC must be greater than montantHT' })
      return
    }

    list.push(itemToSave)

    await fs.promises.writeFile('./db/facture.json', JSON.stringify(list))

    res.json(itemToSave)
  } catch (err) {

    console.log(err)
    res.status(500).json({ error: true, message: 'Error reading file' })
  }
}

const deleteItem = async (req, res) => {
  try {

    const data = await fs.promises.readFile('./db/facture.json', 'utf8')

    const list = JSON.parse(data)


    const itemToDelete = list.find(item => item.id == req.params.id)
    if (!itemToDelete) {
      res.status(404).json({ error: true, message: 'Facture not found' })
      return
    }


    const listToSave = list.filter(item => item.id != req.params.id)


    await fs.promises.writeFile('./db/facture.json', JSON.stringify(listToSave))

    res.json({ error: false, message: 'Facture deleted' })
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: true, message: 'Error reading file' })
  }
}

export { getItems, getItem, patchItem, postItem, deleteItem }
