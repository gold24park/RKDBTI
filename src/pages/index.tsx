import { PrimaryButton, SecondaryButton } from "@components/button/Buttons";
import { Copyright } from "@components/Copyright";
import { Layout } from "@components/Layout";
import { logEvent } from "@firebase/analytics";
import { fetcher } from "@services/fetcher";
import { StatisticsResult } from "@services/models/StatisticsResult";
import { media } from "@styles/size";
import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import useSWR from "swr";
import mainStyles from "../styles/main.module.css";

const Title = styled.h1`
  font-family: 'ChosunKm', serif;
  font-size: 66px;
  position: relative;
  top: 20px;
  left: 10px;
  color: black;
  text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff;
  margin: 2rem 0 10px 0;
  ${media.phone} {
    font-size: 50px;
  }
`;

const Counter = styled.div`
  margin-left: 20px;
  font-weight: bold;
  background: #eee;
  padding: 6px 12px;
  position: absolute;
  border-radius: 10px;
  left 10px;
`;

const Home: NextPage = () => {
  const { data, error } = useSWR<StatisticsResult>(`/api/count`, fetcher)
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
        <div className={mainStyles.skewed3} />
        <div className={mainStyles.skewed2} />
        <div className={mainStyles.skewed1} />
        <Link href="https://www.youtube.com/watch?v=2xmxOPCFEqE">
          <div className={mainStyles.railSimteBadge}>
            <Image
              src="/images/ic_youtube_kids.webp"
              height={20}
              width={20}
              alt="김래일 유튜브"
            />
            김래일의 애니캐 심리테스트
          </div>
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

        <h2 className={mainStyles.railComics}>RAIL COMICS</h2>

        <h2 className={mainStyles.railComicsOne}>1</h2>

        { data && data.totalCount > 0 && (
            <Counter>{data.totalCount.toLocaleString('en-US')}명이 참여했어요</Counter>
          )
        }

        <PrimaryButton className={mainStyles.startBtn} onClick={handleClick}>
          와쿠와쿠...! 시작하기
        </PrimaryButton>

        <SecondaryButton
          className={mainStyles.shareBtn}
          onClick={handleClickShare}
        >
          다른 오타쿠에게 공유하기
        </SecondaryButton>

        <Copyright className={mainStyles.copyRight} />
      </div>
    </Layout>
  );
};

export default Home;
