import * as mongo from "mongodb";
import { AppApiRequest } from "./session";

const MONGO_URI = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`

interface Database {
  client?: mongo.MongoClient;
  characters?: mongo.Collection;
  statistics?: mongo.Collection;
}

export interface DatabaseRequest extends AppApiRequest {
  db: Database;
  session?: string;
}

const connectDB = (async function () {
  console.log(`Start connecting to mongodb...${MONGO_URI}`);
  const mongoClient: mongo.MongoClient = new mongo.MongoClient(MONGO_URI, {
    connectTimeoutMS: 5000,
  });
  const client = await mongoClient.connect();
  const database: mongo.Db = client.db(process.env.MONGO_DATABASE);
  const characters = database.collection("characters");
  const statistics = database.collection("statistics");
  await createIndexes(database);
  return {
    client,
    characters,
    statistics,
  };
})();

async function createIndexes(database: mongo.Db) {
  await database.collection("characters").createIndex(
    {
      unique_id: 1,
    },
    {
      unique: true,
      name: "unique_id_idx",
    }
  );
}

export async function getDatabase(req: DatabaseRequest, res: any, next: any) {
  try {
    req.db = await connectDB;
  } catch (err: unknown) {
    console.error(err);
  } finally {
    return next();
  }
}