import nc from "next-connect";
import { getDatabase } from "@middlewares/database"
import session from "next-session";

const middleware = nc()

middleware.use(session)
middleware.use(getDatabase)

export default middleware