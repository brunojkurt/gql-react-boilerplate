FROM node:alpine

WORKDIR /usr/app

ENV PATH usr/app/node_modules/.bin:$PATH

COPY package*.json ./

RUN npm install

COPY . .