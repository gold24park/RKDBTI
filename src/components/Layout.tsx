import Head from "next/head";
import { ReactNode } from "react";

type Props = {
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
    <div id="wrapper">
        {props.children}
    </div>
  </>
);
