FROM node:14-slim

WORKDIR /app/server

COPY ./package.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD [ "npm", "run", "dev" ]