# Dockerfile

FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# 🔥 Agrega este paso para compilar el TypeScript
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]