import { getDatabase, DatabaseRequest } from "@middlewares/database";
import { getSession } from "@middlewares/session";
import getRedis from "@services/redis";
import { NextApiResponse } from "next";
import nc from "next-connect";

let redis = getRedis()

const handler = nc();

/**
 * 현재 캐릭터 통계 +1를 합니다.
 * @method POST
 * @body typeNumber (number)
 */
handler.use(getSession).use(getDatabase).post<DatabaseRequest, NextApiResponse>(async (req, res) => {
    let typeNumber = parseInt(JSON.parse(req.body).typeNumber as string, 0)
    let column = `type${typeNumber}`;
    if (req.session != null) {
      let cached: number[] = JSON.parse((await redis.get(req.session)) || "[]")
      if (!cached.includes(typeNumber)) {
        await req.db.statistics?.updateOne(
          {},
          { $inc: { [column]: 1 } },
          { upsert: true }
        );
        cached.push(typeNumber)
        // redis ttl = 10분
        await redis.set(req.session, JSON.stringify(cached), 'EX', 60 * 10)
      }
    } 
    return res.status(200).json({})
})
  
  export default handler
  