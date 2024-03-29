import { AdfitBannerAd } from "@components/AdfitBannerAd";
import { BaseImageWrapper } from "@components/BaseImageWrapper";
import { PrimaryButton, SecondaryButton } from "@components/button/Buttons";
import { Layout } from "@components/layout/Layout";
import { logEvent } from "@firebase/analytics";
import { DatabaseRequest, getDatabase } from "@middlewares/database";
import { media, size } from "@styles/size";
import { FindOptions } from "mongodb";
import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import nc from "next-connect";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

const Title = styled.h1`
  font-family: "ChosunBg", sans-serif;
  font-size: 66px;
  position: relative;
  font-weight: 500;
  font-display: swap;
  top: ${size.content_padding}px;
  left: 10px;
  color: black;
  text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff,
    1px 1px 0 #fff;
  margin: 2rem 0 10px 0;
  line-height: 1.2;
  z-index: 1;
  ${media.phone} {
    font-size: 48px;
  }
`;

const Counter = styled.div`
  margin-left: ${size.content_padding}px;
  font-weight: bold;
  background: #eee;
  padding: 6px 12px;
  position: absolute;
  border-radius: 10px;
  left 10px;
  ${media.phone} {
    font-size: 14px;
  }
`;

const Skewed1 = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: repeating-linear-gradient(
    55deg,
    #666,
    #666 3px,
    #4a4a4a 3px,
    #4a4a4a 5px
  );
  padding: 400px 0;
  -webkit-transform: skew(0deg, -10deg);
  -moz-transform: skew(0deg, -10deg);
  -ms-transform: skew(0deg, -10deg);
  -o-transform: skew(0deg, -10deg);
  transform: skew(0deg, -10deg);
  margin-top: -200px;
  ${media.phone} {
    padding: 45vh 0;
  }
`;

const Badge = styled.div`
  background: black;
  color: white;
  border-radius: 30px;
  display: inline;
  padding: 6px 14px;
  position: absolute;
  top: 24px;
  display: flex;
  cursor: pointer;
  img {
    margin-right: 4px !important;
  }
`;

const RailComicsHeading = styled.h2`
  font-family: "Limelight", monospace;
  font-size: 68px;
  color: white;
  text-shadow: -2px -2px 0 #000, 2px -1px 0 #000, -2px 2px 0 #000,
    2px 2px 0 #000;
  transform: rotate(90deg);
  position: absolute;
  white-space: nowrap;
  top: 150px;
  opacity: 0.9;
  right: -165px;
  ${media.phone} {
    font-size: 48px;
    top: 110px;
    right: -115px;
  }
`;

const RailComicsOne = styled.h2`
  font-family: "Limelight", monospace;
  font-size: 138px;
  position: absolute;
  bottom: 80px;
  right: ${size.content_padding}px;
  ${media.phone} {
    font-size: 98px;
    bottom: 65px;
  }
`;

const StartButtonWrapper = styled.div`
  position: absolute;
  bottom: calc(60px + ${size.button_height}px + 10px);
  width: calc(100% - ${size.content_padding * 2}px) !important;
  ${media.phone} {
    bottom: calc(60px + ${size.mobile.button_height}px + 10px);
  }
`

const ShareButtonWrapper = styled.div`
  position: absolute;
  bottom: 60px;
  width: calc(100% - ${size.content_padding * 2}px) !important;
`

const MainImageWrapper = styled(BaseImageWrapper)`
  position: absolute;
  width: 650px;
  right: -100px;
  bottom: -100px;
  filter: grayscale(70%);
  animation: float 6s ease-in-out infinite;
  &:hover {
    filter: grayscale(0%);
    transition: ease 0.3s;
  }
  @keyframes float {
    0% {
      transform: rotate(-10deg) translatey(0px);
    }
    50% {
      transform: rotate(-8deg) translatey(-14px);
    }
    100% {
      transform: rotate(-10deg) translatey(0px);
    }
  }
  ${media.phone} {
    width: 400px;
    right: -40px;
    bottom: -140px;
  }
`

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {  
  const middleware = nc().use(getDatabase);
  await middleware.run(req, res);

  let request = req as DatabaseRequest

  let totalCount = 0;

  try {
    let statistics = await request.db.statistics?.findOne({}, {
      projection: { _id: 0 },
    } as FindOptions);

    totalCount = statistics ? Object.values(statistics).reduce((p, c) => p + c) : 0;
  } catch (e) {
    // ignore
    console.log(e);
  }
  return {
    props: { totalCount },
  };
};


const Home: NextPage = ({ totalCount }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/test");
  };

  const handleClickShare = () => {
    logEvent(window.FirebaseAnalytics, "share_home", {
      url: location.href,
    });

    if (navigator.share) {
      navigator
        .share({
          title: "김래일의 애니캐 테스트 - 내가 애니캐가 된다면",
          url: location.href,
        })
        .then(() => {})
        .catch(console.error);
    } else {
      navigator.clipboard.writeText(location.href);
      alert("링크가 복사되었다능!");
    }
  };

  return (
    <Layout>
      <div style={{ padding: "20px" }}>
        <Skewed1 />
        <Link href="https://www.youtube.com/watch?v=2xmxOPCFEqE">
          <Badge>
            <Image
              src="/images/ic_youtube_kids.webp"
              height={20}
              width={20}
              alt="김래일 유튜브"
            />
            김래일의 애니캐 테스트
          </Badge>
        </Link>
        <Title>
          내가
          <br />
          애니메이션
          <br />
          캐릭터가
          <br />
          된다면...?
        </Title>

        <br />

        <MainImageWrapper>
          <Image
            src={`/images/character/15.png`}
            layout="fill"
            objectFit="contain" 
            alt={'김래일의 애니캐 테스트'}
          />
        </MainImageWrapper>
        <RailComicsHeading>RAIL COMICS</RailComicsHeading>
        <RailComicsOne>1</RailComicsOne>

        {totalCount > 0 && (
          <Counter>
            {totalCount.toLocaleString("en-US")}명이 참여했어요
          </Counter>
        )}

        <StartButtonWrapper>
          <PrimaryButton onClick={handleClick}>
            와쿠와쿠...! 시작하기
          </PrimaryButton>
        </StartButtonWrapper>

        <ShareButtonWrapper>
          <SecondaryButton onClick={handleClickShare}>
            다른 오타쿠에게 공유하기
          </SecondaryButton>
        </ShareButtonWrapper>
      </div>
    </Layout>
  );
};

export default Home;
