import Head from "next/head";
import { ReactNode } from "react";
import { Navbar } from "./Navbar";

type Props = {
    children?: ReactNode
}

export const Layout = (props: Props) => (
  <>
    <Head>
      <title>RKDBTI</title>
      <meta name="description" content="RKDBTI description here." />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Navbar/>
    <div>
        {props.children}
    </div>
  </>
);
