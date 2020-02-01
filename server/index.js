import express from 'express'
import next from 'next'
import api from './api'

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()
  server.use(express.json())
  server.use(express.urlencoded())

  console.log({ api })
  server.get('/api/v0/getGoogleSheet', api.v0.getGoogleSheet)

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
