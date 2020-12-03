FROM node:14-slim

WORKDIR /app/client

COPY ./package.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN npm run build

COPY ./build /app/server 

CMD [ "npm", "start" ]