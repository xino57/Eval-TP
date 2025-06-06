import express from 'express'
const app = express()

// ✅ Configuration CORS manuelle - À placer AVANT les autres middlewares
app.use((req, res, next) => {
  // Autoriser les requêtes depuis le frontend Vue.js
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173')
  
  // Autoriser ces headers dans les requêtes
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  
  // Autoriser ces méthodes HTTP
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
  
  // Autoriser l'envoi de cookies/credentials
  res.header('Access-Control-Allow-Credentials', 'true')
  
  // Répondre aux requêtes OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  
  next()
})

app.use(express.json())
const port = 3000

import factureRoutes from './routes/facture.mjs'


app.use('/factures', factureRoutes)

app.get('/', (req, res) => {
  res.json('API pour notre app Vue-js')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
