FROM node:alpine

WORKDIR /usr/app

ENV PATH usr/app/node_modules/.bin:$PATH

COPY package*.json ./
COPY yarn.lock ./

RUN apk --no-cache add --virtual builds-deps build-base python3 bash

EXPOSE $PORT