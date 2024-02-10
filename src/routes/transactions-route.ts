import { PrismaClient } from "@prisma/client"
import { FastifyInstance } from "fastify"
import { z } from "zod"

export async function transactions(app: FastifyInstance) {
  app.post("/clientes/:id/transacoes", async (req, reply) => {
    const prisma = new PrismaClient()

    const paramsSchema = z.object({
      id: z.coerce.number().int().positive(),
    })

    const bodySchema = z.object({
      valor: z.number().int().positive(),
      tipo: z.enum(["c", "d"]),
      descricao: z.string().min(1).max(10),
    })

    const { id } = paramsSchema.parse(req.params)

    const { valor, tipo, descricao } = bodySchema.parse(req.body)

    const cliente = await prisma.clientes
      .findUniqueOrThrow({
        where: {
          id: id,
        },
      })
      .catch(() => {
        return reply.status(404).send({ error: "cliente non ecziste!" })
      })

    let novoSaldo = 0
    try {
      if (tipo === "c") {
        novoSaldo = cliente.saldo + valor
      } else if (tipo === "d") {
        novoSaldo = cliente.saldo - valor
        if (novoSaldo < cliente.limite * -1) throw "Saldo insuficiente."
      }

      const clienteAtualizado = await prisma.clientes.update({
        where: {
          id: id,
        },
        data: {
          saldo: novoSaldo,
        },
      })
    } catch (e) {
      return reply.status(422).send({ error: e })
    }

    try {
      const transacao = await prisma.transacoes.create({
        data: {
          clientes_id: id,
          valor,
          tipo,
          descricao,
        },
      })
    } catch (e) {
      return reply.status(422).send({ error: e })
    }

    return reply.status(200).send({
      limite: cliente.limite,
      saldo: novoSaldo,
    })
  })
}
