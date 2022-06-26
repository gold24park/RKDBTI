import { KakaoButton } from "@components/KakaoButton"
import { Layout } from "@components/Layout"
import { TwitterButton } from "@components/TwitterButton"
import { MyCharacterResult } from "@services/models/MyCharacterResult"
import { ResultConverter } from "@services/ResultConverter"
import { NextPage } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const ResultDevPage: NextPage = () => {
    const router = useRouter()

    const [result, setResult] = useState<MyCharacterResult | null>()
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        if (router && router.query) {
            const type = router.query.type || ""
            let typeNumber = ResultConverter.decode(type as string)
            if (process.env.NODE_ENV == "development" && !typeNumber) {
                // 개발 테스트의 용이성을 위해 typeNumber로 바로 확인할 수 있게 한다.
                typeNumber = router.query.typeNumber as string
            }
            requestResult(typeNumber)
        }
    }, [router])

    const requestResult = (typeNumber: any) => {
        if (!typeNumber || isLoading) {
            return
        }
        let myChar: MyCharacterResult = {
            unique_id: 13,
            description: "설명텍스트",
            name: "아방캐",
            image: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FFZPCD%2FbtrFJlqtpCd%2Fn9s3QRfjdXktT5naJV1Q61%2Fimg.webp",
            percentage: 12
        }
        setResult(myChar)
    }

    if (isLoading) {
        // TODO: 두구두구~ 애니메이션이 나왔으면!
        return (
            <Layout>
                <h1>결과를 불러오는 중...</h1>
            </Layout>
        )
    }

    if (result == null) {
        return (
            <Layout>
                <h1>앗 찾을 수 없는 결과입니다</h1>
            </Layout>
        )
    }

    const kakaoShareTitle = "내가 애니캐가 된다면"
    const twitterShareTitle = `내가 애니캐가 된다면\n${result.name}일지도?`
    
    return (
        <Layout>
            <Head>
                <meta property="og:url" content={location.href}/>
                <meta property="og:title" content={`내가 애니캐가 된다면 | ${result.name}`}/>
                <meta property="og:image" content={result.image}/>
                <meta property="og:description" content={result.description}/>
            </Head>
            <h1>당신의 타입은 {result.unique_id}</h1>
            <code>
                {JSON.stringify(result)}
            </code>
            <br/>
            <TwitterButton shareTitle={twitterShareTitle} result={result}/>
            <br/>
            <KakaoButton shareTitle={kakaoShareTitle} result={result}/>
        </Layout>
    )
}

export default ResultDevPage