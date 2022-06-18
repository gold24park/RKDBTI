import type { AppProps } from 'next/app'
import { GlobalStyle } from '@styles/global-style'
import { theme } from '@styles/theme'
import { ThemeProvider } from 'styled-components'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle/>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default App
