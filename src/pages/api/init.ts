import { getDatabase, DatabaseRequest } from "@middlewares/database";
import { AnyBulkWriteOperation, Filter } from "mongodb";
import { NextApiResponse } from "next";
import characterList from "@services/json/characters.json";
import nc from "next-connect";

const handler = nc();

// 개발용, characters.json 데이터를 MongoDB에 저장
handler
  .use(getDatabase)
  .get<DatabaseRequest, NextApiResponse>(async (req, res) => {
    let upsertTasks: AnyBulkWriteOperation[] = [];
    characterList.forEach((character) => {
      upsertTasks.push({
        updateOne: {
          filter: { unique_id: character.unique_id },
          update: { $set: character },
          upsert: true,
        },
      });
    });

    await req.db.characters?.bulkWrite(upsertTasks);

    res.status(200).json({
      ...characterList,
    });
  });

export default handler;
