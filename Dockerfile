FROM node:18-alpine

WORKDIR /app

# copy package files first so Docker caches this layer
COPY package*.json ./

RUN npm install

# copy the rest of the project
COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
