import Head from "next/head";
import { ReactNode } from "react";
import PageTransition from "../PageTransition";

type Props = {
    wrapper?: string
    children?: ReactNode
}


export const Layout = (props: Props) => {
  const title = "김래일의 애니캐 테스트 - 내가 애니캐가 된다면"
  const description = "내가 만약 애니메이션 캐릭터가 된다면 어떤 모습일까? 오타쿠를 위한 덕BTI 김래일의 애니캐 테스트!"
  const metaImage = `${process.env.NEXT_PUBLIC_URL}/images/meta.png`;
  return (
    <>
      <Head>
        <title>김래일의 애니캐 테스트</title>
        <meta name="description" content={description} />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_URL}></meta>
        <meta property="og:title" content={title}></meta>
        <meta property="og:image" content={metaImage}></meta>
        <meta name="color-scheme" content="light only"/>
        <meta name="supported-color-schemes" content="light"/>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={metaImage} />
        <meta name="twitter:site" content="@rail_studio" />
        <meta name="twitter:creator" content="@rail_studio"/>
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:title" content={title} />
        <meta property="twitter:domain" content={process.env.NEXT_PUBLIC_URL}/>
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
  )
};
