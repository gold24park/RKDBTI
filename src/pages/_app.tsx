import type { AppProps } from 'next/app'
import { GlobalStyle } from '@styles/global-style'
import { theme } from '@styles/theme'
import { ThemeProvider } from 'styled-components'
import Head from 'next/head'
import { useEffect } from 'react'

declare global {
  interface Window {
    Kakao: any
  }
}

function App({ Component, pageProps }: AppProps) {

  useEffect(() => {
    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY)
  }, [])

  return (
    <>
      <Head>
          <script defer src="https://developers.kakao.com/sdk/js/kakao.js"></script>            
      </Head>
      <GlobalStyle/>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default App
