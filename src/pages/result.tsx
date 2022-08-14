import {
  SecondaryButton,
  SnsButton
} from "@components/button/Buttons";
import { KakaoButton } from "@components/button/KakaoButton";
import { TwitterButton } from "@components/button/TwitterButton";
import { Copyright } from "@components/Copyright";
import { CommentLayout } from "@components/layout/CommentLayout";
import { Layout } from "@components/layout/Layout";
import { Navbar } from "@components/Navbar";
import { RelatedCharacter } from "@components/result/RelatedCharacter";
import { Result } from "@components/result/Result";
import { YoutubeAdvertisement } from "@components/result/YoutubeAdvertisement";
import { SystemHeading, SystemWrapper } from "@components/System";
import { DatabaseRequest, getDatabase } from "@middlewares/database";
import { fetcher } from "@services/fetcher";
import { Character } from "@services/models/Chracter";
import { MyCharacterResult } from "@services/models/MyCharacterResult";
import { StatisticsResult } from "@services/models/StatisticsResult";
import { ResultConverter } from "@services/ResultConverter";
import { theme } from "@styles/theme";
import { logEvent } from "firebase/analytics";
import { Filter, FindOptions } from "mongodb";
import { GetServerSideProps } from "next";
import nc from "next-connect";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

type Props = {
  result: MyCharacterResult | null;
  url: string | null;
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  const middleware = nc().use(getDatabase);
  await middleware.run(req, res);
  const { type } = query;

  const db = (req as DatabaseRequest).db;

  var result = null;

  let typeNumber = parseInt(ResultConverter.decode(type as string), 0);

  let character: Character | null | undefined = await db.characters?.findOne(
    {
      unique_id: typeNumber as number,
    } as Filter<Character>,
    { projection: { _id: 0 } } as FindOptions
  );

  if (character) {
    let relatedUniqueIds: number[] = [character?.good || 0, character.bad || 0];

    let relatedCharacters = await db.characters
      ?.aggregate([
        { $match: { unique_id: { $in: relatedUniqueIds } } },
        {
          $project: { unique_id: 1, name: 1, image: 1, main_color: 1, _id: 0 },
        },
      ])
      .toArray();

    // 잘 맞는 캐릭터와 아닌 캐릭터
    let good =
      relatedCharacters?.find((c) => character?.good == c.unique_id) || null;
    let bad =
      relatedCharacters?.find((c) => character?.bad == c.unique_id) || null;

    result = {
      ...character,
      good,
      bad,
    };
  }
  return {
    props: { result },
  };
};

function ResultPage({ result }: Props) {
  const router = useRouter();

  // 직접 테스트 했을 경우
  const tested = router.query.t == "1";

  const { data, error } = useSWR<StatisticsResult>(
    `/api/statistics?typeNumber=${result?.unique_id}`,
    fetcher
  );

  useEffect(() => {
    // 직접 테스트 여부를 저장했으므로 가린다.
    const params = new URLSearchParams(location.search);
    window.history.pushState(
      null,
      "result",
      `/result?type=${params.get("type")}`
    );
  }, []);

  if (result == null) {
    return (
      <Layout>
        <SystemWrapper>
          <SystemHeading>?</SystemHeading>
          <p>
            겨..결과를 찾을 수 없어..!
            <br />
            어찌된거지?!
            <br />
            <Link href="/">
              <a>홈</a>
            </Link>
            으로 돌아가자.
          </p>
        </SystemWrapper>
      </Layout>
    );
  }

  const defaultTitle = "김래일의 애니캐 테스트 - 내가 애니캐가 된다면";
  const twitterShareTitle = `${defaultTitle}\n${result.name}(이)랄까?`;

  const shareImage = `${process.env.NEXT_PUBLIC_URL}/images/share/${result.unique_id}.png`;
  const shareKakaoImage = `${process.env.NEXT_PUBLIC_URL}/images/colored/${result.unique_id}.png`;
  const shareUrl = `${
    process.env.NEXT_PUBLIC_URL
  }/result?type=${ResultConverter.encode(result.unique_id)}`;
  const title = `${defaultTitle} | ${result.name}`;
  const description = `<${result.name}> ${result.description}`;

  const handleClickShare = () => {
    logEvent(window.FirebaseAnalytics, "share_result", {
      url: location.href,
    });

    if (navigator.share) {
      navigator
        .share({
          title: defaultTitle,
          url: shareUrl,
        })
        .then(() => {})
        .catch(console.error);
    } else {
      navigator.clipboard.writeText(location.href);
      alert("링크가 복사되었다능!");
    }
  };

  return (
    <Layout wrapper="result_wrapper">
      <Navbar />
      <Head>
        <meta property="og:url" content={process.env.NEXT_PUBLIC_URL} />
        <meta property="og:title" content={title} />
        <meta property="og:image" content={shareImage} />
        <meta property="og:description" content={description} />
        <meta name="twitter:image" content={shareImage} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Head>
      <Result result={result} data={data} />
      <br />
      <RelatedCharacter isGood={true} result={result} />
      <br />
      <RelatedCharacter isGood={false} result={result} />

      {tested && (
        <CommentLayout
          character_name={result.name}
          color={result.main_color}
          unique_id={result.unique_id}
        />
      )}
      {tested == false && <CommentLayout />}

      <TwitterButton
        style={{ marginTop: "60px" }}
        shareTitle={twitterShareTitle}
        shareImage={shareImage}
        shareUrl={shareUrl}
        result={result}
      />
      <br />
      <KakaoButton
        shareTitle={defaultTitle}
        result={result}
        shareImage={shareKakaoImage}
        shareUrl={shareUrl}
      />
      <SnsButton
        onClick={handleClickShare}
        backgroundColor={theme.colors.darkSurface}
        fontColor={"black"}
      >
        <div className="imageWrapper">
          <Image src="/images/link.png" width={30} height={30} alt="link" />
        </div>
        링크 공유하기
      </SnsButton>
      <Link href="/">
        <SecondaryButton>다시하기</SecondaryButton>
      </Link>
      <YoutubeAdvertisement
        style={{ marginTop: "40px" }}
        subtitle="2D전문 인류학자"
        title="김래일"
        youtubeUrl="https://www.youtube.com/c/%EA%B9%80%EB%9E%98%EC%9D%BC"
        twitchUrl="https://www.twitch.tv/rail_kim"
      />
      <br />
      <Copyright />
    </Layout>
  );
}

export default ResultPage;
