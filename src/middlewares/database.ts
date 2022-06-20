import connectToDatabase from "@services/mongodb/connect";
import * as mongo from "mongodb";
import { NextApiRequest } from "next";
import { AppApiRequest } from "./session";

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
            db.client = await connectToDatabase()
    
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