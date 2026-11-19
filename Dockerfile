# COSC 2328 — canonical Node container (works on Windows, Mac, and the droplet)
FROM node:20-slim

# sqlite3 is a native module. These build tools let npm compile it inside the container.
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --build-from-source
COPY . .
EXPOSE 3000
CMD ["node", "app.js"]
