import type { AppProps } from "next/app";
import { GlobalStyle } from "@styles/global-style";
import { theme } from "@styles/theme";
import { ThemeProvider } from "styled-components";
import Script from "next/script";
import { useEffect } from "react";
import { firebaseApp } from "@services/firebaseApp";
import { getAnalytics } from "firebase/analytics";

declare global {
  interface Window {
    Kakao: any;
    FirebaseAnalytics: any;
  }
}

function App({ Component, pageProps, router }: AppProps) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.FirebaseAnalytics = getAnalytics(firebaseApp);
    }
  }, []);

  return (
    <>
      <Script
        src="https://developers.kakao.com/sdk/js/kakao.js"
        onLoad={() => {
          window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
        }}
      />
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default App;
