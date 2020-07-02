import { ZeitProvider, CssBaseline } from '@zeit-ui/react'

function MyApp({ Component, pageProps }) {
  return (
    <ZeitProvider>
      <CssBaseline />
      <Component {...pageProps} />
    </ZeitProvider>
  )
}
export default MyApp
