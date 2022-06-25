import * as mongo from "mongodb";
import { NextApiRequest } from "next";
import { AppApiRequest } from "./session";

const MONGO_URI = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`

interface Database {
    client?: mongo.MongoClient;
    characters?: mongo.Collection;
    statistics?: mongo.Collection;
}

export interface DatabaseRequest extends AppApiRequest {
    db: Database,
    session?: string
}

const db: Database = {}

let createdIndexes = false
async function createIndexes() {
    if (createdIndexes) {
        return
    }
    await db.characters?.createIndex({
        "unique_id": 1
    }, {
        unique: true,
        name: "unique_id_idx"
    })
    createdIndexes = true
}

export async function getDatabase(req: DatabaseRequest, res: any, next: any) {
    try {
        if (db.client == null) {
            console.log(`Start connecting to mongodb...${MONGO_URI}`)
            const client: mongo.MongoClient = new mongo.MongoClient(MONGO_URI, {
                connectTimeoutMS: 5000
            })
            db.client = await client.connect()
    
            const database: mongo.Db = db.client.db(process.env.MONGO_DATABASE)
            db.characters = database.collection("characters")
            db.statistics = database.collection("statistics")
        }
        await createIndexes()
    
        req.db = db    
    } catch (err: unknown) {
        console.error(err)
    } finally {
        return next()
    }
}