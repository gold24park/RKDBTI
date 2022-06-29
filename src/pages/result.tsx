import { KakaoButton } from "@components/KakaoButton"
import { Layout } from "@components/Layout"
import { TwitterButton } from "@components/TwitterButton"
import { Character } from "@services/models/Chracter"
import { ResultConverter } from "@services/ResultConverter"
import { Filter, FindOptions } from "mongodb"
import { GetServerSideProps, NextPage } from "next"
import Head from "next/head"
import nc from "next-connect";
import { DatabaseRequest, getDatabase } from "@middlewares/database"
import { MyCharacterResult } from "@services/models/MyCharacterResult"

type Props = {
    result: MyCharacterResult | null,
    url: string | null
}

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
    const middleware = nc().use(getDatabase)

    await middleware.run(req, res)
    
    const { type } = query

    const db = (req as DatabaseRequest).db

    var result = null

    let typeNumber = parseInt(ResultConverter.decode(type as string), 0)

    let character: Character | null | undefined = await db.characters?.findOne({
        unique_id: typeNumber as number
    } as Filter<Character>, 
    {projection: {_id: 0}} as FindOptions)

    if (character) {
        let relatedUniqueIds: number[] = [character?.good || 0, character.bad || 0]

        let [ relatedCharacters, statistics ] = await Promise.all([
            db.characters?.aggregate([
                {$match: {unique_id: {$in: relatedUniqueIds}}},
                {$project: {unique_id: 1, name: 1, image: 1, _id: 0}}
            ]).toArray(),
            db.statistics?.findOne({}, {projection: {_id: 0}} as FindOptions)
        ])

        // 잘 맞는 캐릭터와 아닌 캐릭터
        let good = relatedCharacters?.find(c => character?.good == c.unique_id) || null
        let bad = relatedCharacters?.find(c => character?.bad == c.unique_id) || null

        // 통계적으로 몇 %?
        let column = `type${typeNumber}`
        let percentage: number = 100

        if (statistics) {
            let target = (statistics[column] || 0) + 1 // 자기자신
            let sum = Object.values(statistics).reduce((p, c) => p + c)
            percentage = target / sum * 100
        }
        
        result = { 
            ...character,
            good,
            bad,
            percentage
        };
    }

    const url = req.headers["referer"] || null

    return {
        props: { result, url }
    }
}


function ResultPage({ result, url }: Props) {
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
                <meta property="og:url" content={url || ""} />
                <meta property="og:title" content={`내가 애니캐가 된다면 | ${result.name}`} />
                <meta property="og:image" content={result.image} />
                <meta property="og:description" content={result.description} />
            </Head>
            <h1>당신의 타입은 {result.unique_id}</h1>
            <code>
                {JSON.stringify(result)}
            </code>
            <br />
            <TwitterButton shareTitle={twitterShareTitle} result={result} />
            <br />
            <KakaoButton shareTitle={kakaoShareTitle} result={result} />
        </Layout>
    )
}

export default ResultPage