import { PrimaryButton, SecondaryButton } from "@components/button/Buttons";
import { Copyright } from "@components/Copyright";
import { Layout } from "@components/Layout";
import { logEvent } from "@firebase/analytics";
import { fetcher } from "@services/fetcher";
import { StatisticsResult } from "@services/models/StatisticsResult";
import { media, size } from "@styles/size";
import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import useSWR from "swr";

const Title = styled.h1`
  font-family: "ChosunKm", serif;
  font-size: 66px;
  position: relative;
  top: ${size.content_padding}px;
  left: 10px;
  color: black;
  text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff;
  margin: 2rem 0 10px 0;
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
`;

const Skewed1 = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: repeating-linear-gradient(
    55deg,
    #888,
    #888 3px,
    #555 3px,
    #555 5px
  );
  padding: 200px 0;
  -webkit-transform: skew(0deg, -10deg);
  -moz-transform: skew(0deg, -10deg);
  -ms-transform: skew(0deg, -10deg);
  -o-transform: skew(0deg, -10deg);
  transform: skew(0deg, -10deg);
  margin-top: -200px;
`;

const Skewed2 = styled(Skewed1)`
  top: 120px;
  background: rgba(0, 0, 0, 0.15);
  padding: 200px 0;
  -webkit-transform: skew(0deg, -22deg);
  -moz-transform: skew(0deg, -22deg);
  -ms-transform: skew(0deg, -22deg);
  -o-transform: skew(0deg, -22deg);
  transform: skew(0deg, -22deg);
`;

const Skewed3 = styled(Skewed1)`
  top: auto;
  background: radial-gradient(#999 1px, transparent 1px);
  background-size: 8px 8px;
  padding: 900px 0;
  -webkit-transform: skew(0deg, 10deg);
  -moz-transform: skew(0deg, 10deg);
  -ms-transform: skew(0deg, 10deg);
  -o-transform: skew(0deg, 10deg);
  transform: skew(0deg, 10deg);
  bottom: 120px;
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
    font-size: 108px;
  }
`;

const Home: NextPage = () => {
  const { data, error } = useSWR<StatisticsResult>(`/api/count`, fetcher);
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
          title: "내가 애니캐가 된다면",
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
        <Skewed3 />
        <Skewed2 />
        <Skewed1 />
        <Link href="https://www.youtube.com/watch?v=2xmxOPCFEqE">
          <Badge>
            <Image
              src="/images/ic_youtube_kids.webp"
              height={20}
              width={20}
              alt="김래일 유튜브"
            />
            김래일의 애니캐 심리테스트
          </Badge>
        </Link>
        <Title>
          애니
          <br />
          캐릭터가
          <br />
          되어버린
          <br />
          나...
        </Title>

        <br />

        <RailComicsHeading>RAIL COMICS</RailComicsHeading>
        <RailComicsOne>1</RailComicsOne>

        {data && data.totalCount > 0 && (
          <Counter>
            {data.totalCount.toLocaleString("en-US")}명이 참여했어요
          </Counter>
        )}

        <div style={{
          position: "absolute",
          bottom: `calc(60px + ${size.button_height}px + 10px)`,
          width: `calc(100% - ${size.content_padding * 2}px) !important`
        }}>
          <PrimaryButton onClick={handleClick}>
            와쿠와쿠...! 시작하기
          </PrimaryButton>
        </div>

        <div style={{
          position: "absolute",
          bottom: "60px",
          width: `calc(100% - ${size.content_padding * 2}px) !important`
        }}>
          <SecondaryButton onClick={handleClickShare}>
            다른 오타쿠에게 공유하기
          </SecondaryButton>
        </div>

        <div style={{
          position: "absolute",
          bottom: "14px",
          left: "50%",
          transform: "translateX(-50%)"
        }}>
          <Copyright />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
