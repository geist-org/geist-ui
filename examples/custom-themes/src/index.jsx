import React from 'react'
import ReactDom from 'react-dom'
import { GeistProvider, CssBaseline, Page } from '@geist-ui/react'
import Home from './home'
import Theme from './theme'

const App = () => {
  return (
    <GeistProvider theme={Theme}>
      <CssBaseline />
      <Page size="mini">
        <Home />
      </Page>
    </GeistProvider>
  )
}

ReactDom.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('app'),
)

export default App
