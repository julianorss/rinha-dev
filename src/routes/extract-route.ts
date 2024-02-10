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

    const cliente = await prisma.clientes
      .findUniqueOrThrow({
        where: {
          id: id,
        },
      })
      .catch(() => {
        return reply.status(404).send({ error: "cliente non ecziste!" })
      })

    const ultimasTransacoes = await prisma.transacoes
      .findMany({
        where: {
          clientes_id: id,
        },
        take: 10,
        orderBy: {
          realizada_em: "desc",
        },
      })
      .catch(() => {
        return reply.status(500).send({
          error: "Não foi possível encontrar as transações do cliente.",
        })
      })

    return reply.status(200).send({
      saldo: {
        total: cliente.saldo,
        data_extrato: new Date().toISOString(),
        limite: cliente.limite,
      },
      ultimasTransacoes: ultimasTransacoes,
    })
  })
}
