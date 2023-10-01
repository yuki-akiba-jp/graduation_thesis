# Set the base image
FROM node:latest

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

COPY . .


EXPOSE 3000

CMD [ "npm", "run", "dev" ]

