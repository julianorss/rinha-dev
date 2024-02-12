FROM node:20-alpine

WORKDIR /usr

COPY pnpm-lock.yaml package.json ./
COPY prisma ./prisma/

RUN npm install -g pnpm
RUN pnpm i
COPY . .
RUN pnpm run build

EXPOSE 8080

# CMD [ "pnpm", "run", "start" ]
CMD ["pnpm", "run", "start:migrate:prod"]