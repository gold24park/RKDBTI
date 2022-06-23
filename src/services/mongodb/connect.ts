import * as mongo from "mongodb";

const MONGO_URI = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`

export default async function connectToDatabase() {
    console.log(`Start connecting to mongodb...${MONGO_URI}`)
    const client: mongo.MongoClient = new mongo.MongoClient(MONGO_URI, {
        connectTimeoutMS: 5000
    })
    return await client.connect()
}