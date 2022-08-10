
export interface Comment {
    _id: string,
    session_id: string,
    unique_id?: number,
    character_name?: string,
    color?: string,
    text: string,
    created: number,
    nickname?: string,
    reported_session_id?: string[]
    is_delete?: number,
    is_mine: boolean,
    is_reported: boolean
}