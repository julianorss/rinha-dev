-- CreateEnum
CREATE TYPE "Tipo" AS ENUM ('c', 'd');

-- CreateTable
CREATE TABLE "Clientes" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "limite" INTEGER NOT NULL DEFAULT 0,
    "saldo" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transacoes" (
    "id" SERIAL NOT NULL,
    "clientes_id" INTEGER NOT NULL,
    "valor" INTEGER NOT NULL,
    "tipo" "Tipo" NOT NULL,
    "descricao" VARCHAR(10) NOT NULL,
    "realizada_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transacoes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transacoes" ADD CONSTRAINT "Transacoes_clientes_id_fkey" FOREIGN KEY ("clientes_id") REFERENCES "Clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
