import { CfxProvider, CssBaseline } from '@cfxjs/react-ui'

function MyApp({ Component, pageProps }) {
  return (
    <CfxProvider>
      <CssBaseline />
      <Component {...pageProps} />
    </CfxProvider>
  )
}
export default MyApp
