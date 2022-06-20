FROM node:16-alpine

RUN apk add --no-cache apache2-utils

WORKDIR /app

COPY . .

RUN yarn install

ENTRYPOINT [ "/app/entrypoint.sh" ]