import Redis from 'ioredis'

export default function getRedis() {
    return new Redis(process.env.REDIS_URI as string)
}