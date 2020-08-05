import { ZeitProvider, CssBaseline } from '@cfxjs/react-ui'

function MyApp({ Component, pageProps }) {
  return (
    <ZeitProvider>
      <CssBaseline />
      <Component {...pageProps} />
    </ZeitProvider>
  )
}
export default MyApp
