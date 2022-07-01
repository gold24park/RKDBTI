import mainStyles from "../styles/main.module.css";
import { PrimaryButton, SecondaryButton } from "@components/Buttons";
import { Layout } from "@components/Layout";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";

const Home: NextPage = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/test");
  };

  return (
    <Layout>
      <div className={mainStyles.skewed2} />
      <div className={mainStyles.skewed1} />
      <div className={mainStyles.railSimteBadge}>
        <Image
          src="/images/ic_youtube_kids.webp"
          height={20}
          width={20}
          alt="김래일 유튜브"
        />
        김래일의 애니캐 심리테스트
      </div>
      <h1 className={mainStyles.mainTitle}>
        애니
        <br />
        캐릭터가
        <br />
        되어버린
        <br />
        나...
      </h1>
      <br />

      <h2 className={mainStyles.railComics}>RAIL COMICS</h2>

      <h2 className={mainStyles.railComicsOne}>1</h2>

      <PrimaryButton className={mainStyles.startBtn} onClick={handleClick}>
        와쿠와쿠...! 시작하기
      </PrimaryButton>

      <SecondaryButton className={mainStyles.shareBtn}>
        다른 오타쿠에게 공유하기
      </SecondaryButton>

      <p className={mainStyles.copyRight}>Copyright 2022 RailKim</p>
    </Layout>
  );
};

export default Home;
