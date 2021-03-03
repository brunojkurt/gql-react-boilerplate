FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./
COPY yarn.lock ./

RUN apk --no-cache add --virtual builds-deps build-base python

RUN yarn install

COPY . .

EXPOSE $PORT

CMD ["yarn", "dev"]