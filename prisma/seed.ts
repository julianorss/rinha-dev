import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const barato = await prisma.clientes.create({
    data: {
      nome: "o barato sai caro",
      limite: 1000 * 100,
      saldo: 0,
    },
  })

  const zan = await prisma.clientes.create({
    data: {
      nome: "zan corp ltda",
      limite: 800 * 100,
      saldo: 0,
    },
  })

  const les = await prisma.clientes.create({
    data: {
      nome: "les cruders",
      limite: 10000 * 100,
      saldo: 0,
    },
  })

  const padaria = await prisma.clientes.create({
    data: {
      nome: "padaria joia de cocaia",
      limite: 100000 * 100,
      saldo: 0,
    },
  })

  const kid = await prisma.clientes.create({
    data: {
      nome: "kid mais",
      limite: 5000 * 100,
      saldo: 0,
    },
  })
  console.log("DB Seed finished")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
