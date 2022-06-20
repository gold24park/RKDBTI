#!/bin/sh
mkdir /app/logs
LOGROTATE="/app/logs/mychar-%Y%m%d-%H%M%S.log"
exec >& >(rotatelogs -e "$LOGROTATE" 86400 +540)

_exec() {
    "$@"
}

yarn build && yarn start