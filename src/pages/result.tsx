import { KakaoButton } from "@components/button/KakaoButton"
import { Layout } from "@components/Layout"
import { TwitterButton } from "@components/button/TwitterButton"
import { Character } from "@services/models/Chracter"
import { ResultConverter } from "@services/ResultConverter"
import { Filter, FindOptions } from "mongodb"
import { GetServerSideProps } from "next"
import Head from "next/head"
import nc from "next-connect"
import useSWR from 'swr'
import { fetcher } from "@services/fetcher"
import { DatabaseRequest, getDatabase } from "@middlewares/database"
import { MyCharacterResult } from "@services/models/MyCharacterResult"
import { StatisticsResult } from "@services/models/StatisticsResult"
import { Navbar } from "@components/Navbar"

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

    console.log(typeNumber, character)

    if (character) {
        let relatedUniqueIds: number[] = [character?.good || 0, character.bad || 0]

        let relatedCharacters = await db.characters?.aggregate([
            {$match: {unique_id: {$in: relatedUniqueIds}}},
            {$project: {unique_id: 1, name: 1, image: 1, _id: 0}}
        ]).toArray()

        // 잘 맞는 캐릭터와 아닌 캐릭터
        let good = relatedCharacters?.find(c => character?.good == c.unique_id) || null
        let bad = relatedCharacters?.find(c => character?.bad == c.unique_id) || null

        result = { 
            ...character,
            good,
            bad
        };
    }

    const url = req.headers["referer"] || null

    return {
        props: { result, url }
    }
}


function ResultPage({ result, url }: Props) {
    const { data, error } = useSWR<StatisticsResult>(`/api/statistics?typeNumber=${result?.unique_id}`, fetcher)

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
            <Navbar/>
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
            {
                data && (
                    <code>{JSON.stringify(data)}</code>
                )
            }
            <br />
            <TwitterButton shareTitle={twitterShareTitle} result={result} />
            <br />
            <KakaoButton shareTitle={kakaoShareTitle} result={result} />
        </Layout>
    )
}

export default ResultPage