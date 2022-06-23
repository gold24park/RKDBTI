import { getDatabase, DatabaseRequest } from "@middlewares/database";
import { getSession } from "@middlewares/session";
import { Character } from "@services/mongodb/models";
import getRedis from "@services/redis";
import { Filter, FindOptions } from "mongodb";
import { NextApiResponse } from "next";
import nc from "next-connect";

let redis = getRedis()

const handler = nc();

// 가장 높은 점수를 받은 항목의 데이터를 가져옵니다.
handler.use(getSession).use(getDatabase).get<DatabaseRequest, NextApiResponse>(async (req, res) => {    
    let typeNumber = parseInt(req.query.typeNumber as string, 0)
    
    let character: Character | null | undefined = await req.db.characters?.findOne({
        unique_id: typeNumber as number
    } as Filter<Character>, 
    {projection: {_id: 0}} as FindOptions)

    if (character) {
        let relatedUniqueIds: number[] = [character?.good || 0, character.bad || 0]

        let [ relatedCharacters, statistics ] = await Promise.all([
            req.db.characters?.aggregate([
                {$match: {unique_id: {$in: relatedUniqueIds}}},
                {$project: {unique_id: 1, name: 1, image: 1, _id: 0}}
            ]).toArray(),
            req.db.statistics?.findOne({}, {projection: {_id: 0}} as FindOptions)
        ])

        // 잘 맞는 캐릭터와 아닌 캐릭터
        let good = relatedCharacters?.find(c => character?.good == c.unique_id)
        let bad = relatedCharacters?.find(c => character?.bad == c.unique_id)

        // 통계적으로 몇 %?
        let column = `type${typeNumber}`
        let percentage: number = 100

        if (statistics) {
            let target = (statistics[column] || 0) + 1 // 자기자신
            let sum = Object.values(statistics).reduce((p, c) => p + c)
            percentage = target / sum * 100
        }

        await updateStatistics(req, typeNumber)
        
        res.status(200).json({ 
            ...character,
            good,
            bad,
            percentage
        });
    } else {
        res.status(404).json({
            code: 404,
            message: "캐릭터를 찾을 수 없어요."
        })
    }
})

async function updateStatistics(req: DatabaseRequest, typeNumber: number) {
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
      // ttl = 10분
      await redis.set(req.session, JSON.stringify(cached), 'EX', 60 * 10)
    }
  } 
}

export default handler
