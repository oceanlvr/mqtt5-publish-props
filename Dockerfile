# specify the node base image with your desired version node:<version>
FROM node:14.1-alpine AS builder
WORKDIR /opt/web
COPY . .
RUN npm install

ENV PATH="./node_modules/.bin:$PATH"

EXPOSE 1883
EXPOSE 8883

CMD npm start
