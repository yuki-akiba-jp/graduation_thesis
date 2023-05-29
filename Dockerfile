# Set the base image
FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Expose the listening port
EXPOSE 3000

# Run app
CMD [ "npm", "start" ]
