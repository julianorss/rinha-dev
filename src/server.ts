import { fastify } from "fastify"
import { transactions } from "./routes/transactions-route"
import { extract } from "./routes/extract-route"

const app = fastify()

const HOST = "0.0.0.0" // Para acessar a API fora do container
const PORT = 3333

app.register(transactions)
app.register(extract)

app
  .listen({
    host: HOST,
    port: PORT,
  })
  .then(() => {
    console.log(`HTTP server running on port ${PORT}`)
  })
