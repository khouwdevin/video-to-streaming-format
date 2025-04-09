FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN apk add --no-cache ffmpeg

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
