# Etapa de build
FROM node:20 AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa final
FROM node:20 AS runner
WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY data-source.ts ./
COPY tsconfig.json ./

# Copia apenas o build da etapa anterior
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/main.js"]
