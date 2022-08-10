import { NextApiResponse } from 'next';
import { NextApiRequest } from 'next';
import nextSession from "next-session";
import { Session } from 'next-session/lib/types';
import { v4 } from "uuid";

const ns = nextSession()

interface AppSession extends Session {
    uuid?: string
}

export interface AppApiRequest extends NextApiRequest {
    session: AppSession
}

export async function getSession(req: any, res: NextApiResponse, next: any) {
    let session = await ns(req, res)
    session.uuid = session.uuid || v4()
    next()
}
