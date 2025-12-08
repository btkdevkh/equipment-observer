# Build
FROM node:22-alpine AS builder
WORKDIR /app

# Copier package.json et installer dépendances
COPY package*.json ./
RUN npm install

# Copier le code source 
COPY . .

RUN npm run build

# Production
FROM node:22-alpine
WORKDIR /app

# Copier package.json original
COPY package*.json ./
RUN npm install --production

# Copier uniquement le résultat du build
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/data ./data

ENV NODE_ENV=production
EXPOSE 3000

CMD ["npm", "run", "start"]
