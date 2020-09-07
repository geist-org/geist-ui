import React from 'react'
import ReactDOM from 'react-dom'
import { CfxProvider, CssBaseline, Page, Button } from '@cfxjs/react-ui'

const App = () => {
  return (
    <Page>
      <p>Hello, world.</p>
      <Button>Action</Button>
    </Page>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <CfxProvider>
      <CssBaseline />
      <App />
    </CfxProvider>
  </React.StrictMode>,
  document.getElementById('app'),
)
