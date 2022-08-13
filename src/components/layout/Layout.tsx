import Head from "next/head";
import { ReactNode } from "react";
import PageTransition from "../PageTransition";

type Props = {
    wrapper?: string
    children?: ReactNode
}

export const Layout = (props: Props) => (
  <>
    <Head>
      <title>김래일의 애니캐 테스트</title>
      <meta name="description" content="김래일의 애니캐 테스트! 내가 만약 애니메이션 캐릭터가 된다면 어떤 모습일까?" />
      <link rel="icon" href="/images/favicon.ico" />
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
