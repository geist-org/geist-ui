import React from 'react'
import ReactDom from 'react-dom'
import { CfxProvider, CssBaseline, Page } from '@cfxjs/react-ui'
import Home from './home'
import Theme from './theme'

const App = () => {
  return (
    <CfxProvider theme={Theme}>
      <CssBaseline />
      <Page size="mini">
        <Home />
      </Page>
    </CfxProvider>
  )
}

ReactDom.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('app'),
)

export default App
