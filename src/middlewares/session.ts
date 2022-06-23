import { NextApiResponse } from 'next';
import { NextApiRequest } from 'next';
import nextSession from "next-session";
import { v4 } from "uuid";

const ns = nextSession()

export interface AppApiRequest extends NextApiRequest {
    session?: string
}

export async function getSession(req: any, res: NextApiResponse, next: any) {
    let session = await ns(req, res)
    session.uuid = session.uuid ? session.uuid : v4()
    req.session = session.uuid
    next()
}