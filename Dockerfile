FROM node:20.9-alpine AS development

RUN mkdir /app

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD npm run dev -- --host