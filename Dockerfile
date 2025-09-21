# Étape 1 : build
FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Étape 2 : production
FROM node:22-alpine
WORKDIR /app

# Copier package.json complet depuis le builder
COPY --from=builder /app/package*.json ./
RUN npm install --production

# Copier le build Next.js et public
COPY --from=builder /app/.next ./
COPY --from=builder /app/public ./public

# Donner la propriété des fichiers à l'utilisateur node
RUN chown -R node:node /app

ENV NODE_ENV=production
ENV PORT=3001
EXPOSE 3001

# Exécuter en tant qu'utilisateur non-root
USER node

CMD ["npm", "run" "start"]
