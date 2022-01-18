import { GeistProvider, CssBaseline } from '@geist-ui/core'

function MyApp({ Component, pageProps }) {
  return (
    <GeistProvider>
      <CssBaseline />
      <Component {...pageProps} />
    </GeistProvider>
  )
}
export default MyApp
