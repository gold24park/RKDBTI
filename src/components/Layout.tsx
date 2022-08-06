import Head from "next/head";
import { ReactNode } from "react";
import PageTransition from "./PageTransition";

type Props = {
    wrapper?: string
    children?: ReactNode
}

export const Layout = (props: Props) => (
  <>
    <Head>
      <title>RKDBTI</title>
      <meta name="description" content="RKDBTI description here." />
      <link rel="icon" href="/favicon.ico" />
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"></link>
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
