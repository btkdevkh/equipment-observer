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

COPY package*.json ./
RUN npm install --production

COPY --from=builder /app/.next ./
COPY --from=builder /app/public ./public

ENV NODE_ENV=production
ENV PORT=3001
EXPOSE 3001

CMD ["npm", "run", "start"]
