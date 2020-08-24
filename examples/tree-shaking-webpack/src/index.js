import React from 'react'
import ReactDOM from 'react-dom'
import { GeistProvider, CssBaseline, Page, Button } from '@geist-ui/react'

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
    <GeistProvider>
      <CssBaseline />
      <App />
    </GeistProvider>
  </React.StrictMode>,
  document.getElementById('app'),
)
