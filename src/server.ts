import { fastify } from "fastify"
import { transactions } from "./routes/transactions-route"
import { extract } from "./routes/extract-route"

const app = fastify()
const PORT = 8080

app.register(transactions)
app.register(extract)

app
  .listen({
    port: PORT,
  })
  .then(() => {
    console.log(`HTTP server running on port ${PORT}`)
  })
