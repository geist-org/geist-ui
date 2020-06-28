import React from 'react'
import ReactDom from 'react-dom'
import { ZeitProvider, CssBaseline, Page } from '@zeit-ui/react'
import Home from './home'
import Theme from './theme'

const App = () => {
  return (
    <ZeitProvider theme={Theme}>
      <CssBaseline />
      <Page size="mini">
        <Home />
      </Page>
    </ZeitProvider>
  )
}

ReactDom.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('app'),
)

export default App
