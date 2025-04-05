# Etapa 1: Build
# FROM node:20 AS builder
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# # Etapa 2: Serve
# FROM node:20-slim
# WORKDIR /app
# RUN npm install -g serve
# COPY --from=builder /app/dist ./dist
# EXPOSE 3000
# CMD ["serve", "dist"]

# Etapa 1: Build
FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: Producción
FROM node:20-slim
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
RUN npm install --omit=dev
EXPOSE 3000
CMD ["node", "./dist/server/entry.mjs"]