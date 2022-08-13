import Head from "next/head";
import { ReactNode } from "react";
import PageTransition from "../PageTransition";

type Props = {
    wrapper?: string
    children?: ReactNode
}

const BASE_URL = ""

export const Layout = (props: Props) => (
  <>
    <Head>
      <title>김래일의 애니캐 테스트</title>
      <meta name="description" content="내가 만약 애니메이션 캐릭터가 된다면 어떤 모습일까? 오타쿠를 위한 덕BTI 김래일의 애니캐 테스트! " />
      <meta name="og:url" content={process.env.NEXT_PUBLIC_URL}></meta>
      <meta name="og:title" content="김래일의 애니캐 테스트 - 내가 애니캐가 된다면"></meta>
      <meta name="og:image" content={`${process.env.NEXT_PUBLIC_URL}/images/meta.png`}></meta>
      <meta name="color-scheme" content="light"/>
      <meta name="supported-color-schemes" content="light"/>
      <link rel="icon" href="/images/favicon.ico" />
      <link href="https://fonts.googleapis.com/css2?family=Limelight&display=swap" rel="stylesheet"></link>
    </Head>
    <PageTransition>
      <div id="frame">
        <div id={props.wrapper || "wrapper"}>
          {props.children}
        </div>
      </div>
    </PageTransition>
  </>
);
