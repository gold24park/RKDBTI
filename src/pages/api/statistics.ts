import { getDatabase, DatabaseRequest } from "@middlewares/database";
import { getSession } from "@middlewares/session";
import getRedis from "@services/redis";
import { FindOptions } from "mongodb";
import { NextApiResponse } from "next";
import nc from "next-connect";

let redis = getRedis()

const handler = nc();

/**
 * 현재 캐릭터의 통계를 가져옵니다.
 * @method GET 
 * @query typeNumber (number)
 * 
 * 현재 캐릭터 통계 +1를 합니다.
 * @method POST
 * @body typeNumber (number)
 */
handler.use(getSession).use(getDatabase)
.get<DatabaseRequest, NextApiResponse>(async (req, res) => {
  try {
    let typeNumber = parseInt(req.query.typeNumber as string)
    let column = `type${typeNumber}`;

    let statistics = await req.db.statistics?.findOne({}, {projection: {_id: 0}} as FindOptions)

    // 통계적으로 몇 %?
    let percentage: number = 100
    let targetCount: number = 0
    let totalCount: number = 0

    if (statistics) {
        targetCount = (statistics[column] || 0) + 1 // 자기자신
        totalCount = Object.values(statistics).reduce((p, c) => p + c)
        percentage = targetCount / totalCount * 100
    }
    return res.status(200).json({
      percentage,
      targetCount,
      totalCount
    })
  } catch (e) {
    console.error(e)
    return res.status(500).json({})
  }
})
.post<DatabaseRequest, NextApiResponse>(async (req, res) => {
    try {
      let typeNumber = 0
      if (Object.keys(req.body).includes("typeNumber")) {
          typeNumber = parseInt(req.body.typeNumber)
      } else {
          parseInt(JSON.parse(req.body).typeNumber as string, 0)
      }

      let column = `type${typeNumber}`;

      if (req.session != null && typeNumber > 0) {
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
    } catch (e) {
      console.error(e)
      return res.status(500).json({})
    }
    
})
  
export default handler
  