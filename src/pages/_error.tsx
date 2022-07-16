import { Layout } from "@components/Layout";
import { SystemHeading, SystemWrapper } from "@components/System";
import Link from "next/link";
import { NextPage } from "next/types";

const App500: NextPage = () => {
    return (
        <Layout>
            <SystemWrapper>
                <SystemHeading>500</SystemHeading>
                <p>
                    뭐지!? 머리끝까지 느껴지는 이 오싹한 기운...<br/>
                    [버그]라고 불리는 녀석인가?<br/>
                    <Link href="/">
                        <a>홈</a>
                    </Link>으로 도망쳐서 잠시 후 다시 시도해보게.
                </p>
            </SystemWrapper>
        </Layout>
    )
}

export default App500;