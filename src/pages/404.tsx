import { Layout } from "@components/Layout";
import { SystemHeading, SystemWrapper } from "@components/System";
import { NextPage } from "next/types";

const App404: NextPage = () => {
    return (
        <Layout>
            <SystemWrapper>
                <SystemHeading>404</SystemHeading>
                <p>
                    어딜 들어온거야! 	『바보』..!<br/>
                    이런모습 보여주고 싶지않은 내 맘도 모르구..<br/>
                    어서 테스트나 하러가란 말이얏 ♥<br/>
                </p>
            </SystemWrapper>
        </Layout>
    )
}

export default App404;