import { PrismaClient } from "@prisma/client"
import { FastifyInstance } from "fastify"
import { z } from "zod"

export async function extract(app: FastifyInstance) {
  app.get("/clientes/:id/extrato", async (req, rest) => {
    const prisma = new PrismaClient()

    const extrato = await prisma.clientes.findMany()

    return extrato
  })
}
