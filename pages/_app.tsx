import Head from 'next/head'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import { useCallback, useState } from 'react'
import { CSSBaseline, ZEITUIProvider, useTheme } from 'components'
import ConfigContext from 'lib/components/config-provider'

const Application: NextPage<AppProps> = ({ Component, pageProps }) => {
  const theme = useTheme()
  const [themeType, setThemeType] = useState<typeof theme.type>(theme.type)
  const changeHandle = useCallback((isDark: boolean) => {
    setThemeType(isDark ? 'dark' : 'light')
  }, [])

  return (
    <>
      <Head>
        <title>React - ZEIT UI</title>
      </Head>
      <ZEITUIProvider theme={{ type: themeType }}>
        <CSSBaseline />
        <ConfigContext onChange={changeHandle}>
          <Component {...pageProps} />
        </ConfigContext>
        <style global jsx>{`
        .tag {
          color: ${theme.palette.accents_5};
        }
        
        .punctuation {
          color: ${theme.palette.accents_5};
        }
        
        .attr-name {
          color: ${theme.palette.accents_6};
        }
        
        .attr-value {
          color: ${theme.palette.accents_4};
        }
        
        .language-javascript {
          color: ${theme.palette.accents_4};
        }
        
        span[class*="class-name"] {
          color: ${theme.palette.purple};
        }
        
        span.token.string {
          color: ${theme.palette.accents_5};
        }
        
        span.keyword {
          color: ${theme.palette.success}
        }
        
        span.plain-text {
          color: ${theme.palette.accents_3};
        }
      `}</style>
      </ZEITUIProvider>
    </>
  )
}

export default Application
