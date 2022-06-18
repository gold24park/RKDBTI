#!/bin/sh
_dev() {
    NODE_ENV=development yarn dev
}

_prd() {
    NODE_ENV=production yarn build && yarn start
}

CMD=$1
shift 1
_$CMD "$@"