# Imagem de desenvolvimento local (next dev). Não serve para produção.
# NEXT_PUBLIC_API_URL precisa estar definida ao iniciar, pois next.config.mjs a lê.
FROM node:20-bookworm-slim

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0"]
