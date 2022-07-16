import { TextButton } from "@components/button/Buttons"
import { KakaoButton } from "@components/button/KakaoButton"
import { TwitterButton } from "@components/button/TwitterButton"
import { Copyright } from "@components/Copyright"
import { Layout } from "@components/Layout"
import { Navbar } from "@components/Navbar"
import { RelatedCharacter } from "@components/RelatedCharacter"
import { Result } from "@components/Result"
import { SystemHeading, SystemWrapper } from "@components/System"
import { YoutubeAdvertisement } from "@components/YoutubeAdvertisement"
import { DatabaseRequest, getDatabase } from "@middlewares/database"
import { fetcher } from "@services/fetcher"
import { Character } from "@services/models/Chracter"
import { MyCharacterResult } from "@services/models/MyCharacterResult"
import { StatisticsResult } from "@services/models/StatisticsResult"
import { ResultConverter } from "@services/ResultConverter"
import { Filter, FindOptions } from "mongodb"
import { GetServerSideProps } from "next"
import nc from "next-connect"
import Head from "next/head"
import Link from "next/link"
import useSWR from 'swr'

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

        let relatedCharacters = await db.characters?.aggregate([
            {$match: {unique_id: {$in: relatedUniqueIds}}},
            {$project: {unique_id: 1, name: 1, image: 1, main_color: 1, _id: 0}}
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
                <SystemWrapper>
                    <SystemHeading>?</SystemHeading>
                    <p>
                        겨..결과를 찾을 수 없어..!<br/>
                        어찌된거지?!<br/>
                        <Link href="/">
                            <a>홈</a>
                        </Link>으로 돌아가자.
                    </p>
                </SystemWrapper>
            </Layout>
        )
    }

    const kakaoShareTitle = "내가 애니캐가 된다면"
    const twitterShareTitle = `내가 애니캐가 된다면\n${result.name}일지도?`

    return (
        <Layout wrapper="result_wrapper">
            <Navbar/>
            <Head>
                <meta property="og:url" content={url || ""} />
                <meta property="og:title" content={`내가 애니캐가 된다면 | ${result.name}`} />
                <meta property="og:image" content={result.image} />
                <meta property="og:description" content={result.description} />
            </Head>
            <Result result={result} data={data}/>
            <br />
            <RelatedCharacter isGood={true} result={result}/>
            <br />
            <RelatedCharacter isGood={false} result={result}/>
            <br />
            <br />
            <TwitterButton shareTitle={twitterShareTitle} result={result} />
            <br />
            <KakaoButton shareTitle={kakaoShareTitle} result={result} />
            <Link href="/">
                <TextButton>처음으로</TextButton>
            </Link>
            <br />
            <br />
            <YoutubeAdvertisement 
                subtitle="2D전문 인류학자"
                title="김래일"
                youtubeUrl="https://www.youtube.com/c/%EA%B9%80%EB%9E%98%EC%9D%BC"
                twitchUrl="https://www.twitch.tv/rail_kim"
            />
            <br />
            <Copyright/>
        </Layout>
    )
}

export default ResultPage