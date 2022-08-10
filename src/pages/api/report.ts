import { getDatabase, DatabaseRequest } from "@middlewares/database";
import { AnyBulkWriteOperation, Filter, ObjectId } from "mongodb";
import { getSession } from "@middlewares/session";
import { NextApiResponse } from "next";
import nc from "next-connect";

const handler = nc()
const PAGE_SIZE = 8

/**
 * 댓글 신고
 * @body id string comment._id
 */
 handler.use(getSession).use(getDatabase).post<DatabaseRequest, NextApiResponse>(async (req, res) => {
    try {
        console.log('report', req.session.uuid);
        let findQuery = { _id: new ObjectId(req.body.id) };
        let comment = await req.db.comments?.findOne(findQuery);
        if (comment?.reported_session_ids.includes(req.session.uuid) == false) {
            await req.db.comments?.updateOne(findQuery, {
                $push: {
                    reported_session_ids: req.session.uuid
                }
            })
            comment?.reported_session_ids.push(req.session.uuid)
        }
        // 4명이상이 신고했다면, 삭제
        if (comment?.reported_session_ids.length > 5) {
            await req.db.comments?.deleteOne(findQuery)
        }
        res.status(200).json({});
    } catch (err) {
        console.error(err);
        res.status(500).json({});
    }
})

export default handler
