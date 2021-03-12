FROM node:alpine

WORKDIR /usr/app

ENV PATH usr/app/node_modules/.bin:$PATH

COPY package*.json ./

RUN apk --no-cache add --virtual builds-deps build-base python

RUN npm install

COPY . .

EXPOSE $PORT