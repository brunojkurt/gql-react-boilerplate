FROM node:14.16.1-alpine3.13

WORKDIR /usr/app

ENV PATH usr/app/node_modules/.bin:$PATH

COPY package*.json ./
COPY yarn.lock ./

RUN apk --no-cache add --virtual builds-deps build-base python
RUN apk add --no-cache bash

EXPOSE $PORT