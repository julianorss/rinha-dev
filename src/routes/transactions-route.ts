import { FastifyInstance } from "fastify"
import { z } from "zod"

export async function transactions(app: FastifyInstance) {
  app.post("/clientes/:id/transacoes", async (req, rest) => {
    return { message: "transacoes route!" }
  })
}
