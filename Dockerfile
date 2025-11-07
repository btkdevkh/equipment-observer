# Étape 1 : build
FROM node:22-alpine AS builder
WORKDIR /app

# Copier package.json et installer dépendances
COPY package*.json ./
RUN npm install

# Copier le code source (en ignorant node_modules et .next)
COPY . .

RUN npm run build

# Étape 2 : production
FROM node:22-alpine
WORKDIR /app

# Copier package.json original
COPY package*.json ./
RUN npm install --production

# Copier uniquement le résultat du build
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

ENV NODE_ENV=production
ENV PORT=3001
EXPOSE 3001

CMD ["npm", "run", "start"]
