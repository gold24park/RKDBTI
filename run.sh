#!/bin/sh

[ ! -f .env.local ] && touch .env.local
[ ! -f .env.development.local ] && touch .env.development.local
[ ! -f .env.production.local ] && touch .env.production.local

_dev() {
    NODE_ENV=development yarn dev
}

_prd() {
    NODE_ENV=production yarn build && yarn start
}

CMD=$1
shift 1
_$CMD "$@"