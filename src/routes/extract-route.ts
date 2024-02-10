import { PrismaClient } from "@prisma/client"
import { FastifyInstance } from "fastify"
import { z } from "zod"

export async function extract(app: FastifyInstance) {
  app.get("/clientes/:id/extrato", async (req, reply) => {
    const prisma = new PrismaClient()

    const paramsSchema = z.object({
      id: z.coerce.number().int().positive(),
    })

    const { id } = paramsSchema.parse(req.params)

    const extrato = await prisma.clientes
      .findUniqueOrThrow({
        where: {
          id: id,
        },
      })
      .catch(() => {
        return reply.status(404).send({ error: "cliente não existe." })
      })

    return reply.status(200).send({
      extrato,
    })
  })
}
