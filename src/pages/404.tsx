import { Layout } from "@components/Layout";
import { NextPage } from "next/types";
import systemStyles from "../styles/system.module.css";

const App404: NextPage = () => {
    return (
        <Layout>
            <div className={systemStyles.center}>
                <h3 className={systemStyles.heading}>404</h3>
                <p>
                    어딜 들어온거야! 	『바보』..!<br/>
                    이런모습 보여주고 싶지않은 내 맘도 모르구..<br/>
                    어서 테스트나 하러가란 말이얏 ♥<br/>
                </p>
            </div>
        </Layout>
    )
}

export default App404;