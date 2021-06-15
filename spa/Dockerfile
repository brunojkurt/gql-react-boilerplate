FROM node:14.16.1-buster-slim

WORKDIR /usr/app

RUN apt install -y bash

COPY package*.json ./
COPY yarn.lock ./