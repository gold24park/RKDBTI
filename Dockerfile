FROM node:16-alpine

RUN apk add --no-cache apache2-utils

WORKDIR /app

COPY . .

RUN yarn install

RUN chmod +x /app/entrypoint.sh

ENTRYPOINT [ "/app/entrypoint.sh" ]