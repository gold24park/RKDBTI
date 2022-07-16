import { getDatabase, DatabaseRequest } from "@middlewares/database";
import { FindOptions } from "mongodb";
import { NextApiResponse } from "next";
import nc from "next-connect";

const handler = nc();

handler.use(getDatabase)
.get<DatabaseRequest, NextApiResponse>(async (req, res) => {
    try {
        let statistics = await req.db.statistics?.findOne({}, {projection: {_id: 0}} as FindOptions)
        let totalCount = statistics ? Object.values(statistics).reduce((p, c) => p + c) : 0;
        return res.status(200).json({
            totalCount
        })
    } catch (e) {
        console.error(e)
        return res.status(500).json({})
    }
});

export default handler