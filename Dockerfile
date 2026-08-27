# COSC 2328 — canonical Node container (works on Windows, Mac, and the droplet)
FROM node:20-slim
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "app.js"]