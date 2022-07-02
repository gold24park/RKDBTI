import { Layout } from "@components/Layout";
import { NextPage } from "next/types";
import systemStyles from "../styles/system.module.css";

const App404: NextPage = () => {
    return (
        <Layout>
            <div className={systemStyles.center}>
                <h3 className={systemStyles.heading}>404</h3>
                <p>
                    낯선자여...아무래도 잘못찾아온 것 같군.<br/>
                    자네가 원하던 페이지는 여기 없네.<br/>
                    이만...돌아가게.
                </p>
            </div>
        </Layout>
    )
}

export default App404;