FROM node:20-alpine

WORKDIR /app

COPY pnpm-lock.yaml package.json ./

COPY prisma ./prisma/

RUN npm install -g pnpm

RUN pnpm i --production

COPY . .

RUN pnpm run build

EXPOSE 3333

CMD ["pnpm", "run", "start:prod"]