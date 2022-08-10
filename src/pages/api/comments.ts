import { getDatabase, DatabaseRequest } from "@middlewares/database";
import { AnyBulkWriteOperation, Filter, ObjectId } from "mongodb";
import { getSession } from "@middlewares/session";
import { NextApiResponse } from "next";
import nc from "next-connect";

const handler = nc()
const PAGE_SIZE = 8

/**
 * 댓글 조회
 * @query page int starts from 1
 */
handler.use(getSession).use(getDatabase).get<DatabaseRequest, NextApiResponse>(async (req, res) => {
    try {
        let page = parseInt(req.query.page as string)
        page = isNaN(page) ? 1 : page

        let findFilter = { 
            is_delete: 0,
            reported_session_ids: {
                "$nin": [req.session.uuid]
            }
        } as Filter<any>

        let [ totalCount, comments ] = await Promise.all([
            req.db.comments?.find(findFilter).count(),
            req.db.comments?.find(findFilter)
            .sort({
                created: -1
            })
            .skip((page - 1) * PAGE_SIZE)
            .limit(PAGE_SIZE)
            .toArray()
        ]);

        comments?.forEach(comment => {
            comment.is_mine = comment.session_id == req.session.uuid
        })

        res.status(200).json({ 
            session_id: req.session.uuid,
            total_count: totalCount,
            page_size: PAGE_SIZE,
            comments,
        });
    } catch (e) {
        console.error(e)
        res.status(500).json({});
    }
})
/**
 * 댓글 작성
 */
.post<DatabaseRequest, NextApiResponse>(async (req, res) => {
    let comment = {
        unique_id: parseInt(req.body.unique_id as string),
        character_name: req.body.character_name as string,
        text: req.body.text,
        color: req.body.color,
        nickname: req.body.nickname as string,
        created: new Date().getTime(),
        session_id: req.session.uuid,
        reported_session_ids: [],
        is_delete: 0
    }

    await req.db.comments?.insertOne(comment);

    res.status(200).json({ 
        comment
    });
})
/**
 * 댓글 삭제
 */
.delete<DatabaseRequest, NextApiResponse>(async (req, res) => {
    console.log('delete', req.session.uuid);
    let result = await req.db.comments?.deleteOne({
        _id: new ObjectId(req.body.id),
        session_id: req.session.uuid
    } as Filter<any>)

    let statusCode = (result?.deletedCount == 1) ? 200 : 404;
    console.log()
    res.status(statusCode).json({})
})

export default handler
