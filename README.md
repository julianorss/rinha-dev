# Rinha 2024

### Stack

Node, TypeScript, Fastify, Zod, Postgres

### Run

npx prisma init
npx prisma migrate dev --name init
npx prisma db seed

docker build -t julianorss/rinha-api:latest .
docker run -i -t julianorss/rinha-api:latest
