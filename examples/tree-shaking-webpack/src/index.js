import React from 'react'
import ReactDOM from 'react-dom'
import { ZeitProvider, CssBaseline, Page, Button } from '@zeit-ui/react'

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
    <ZeitProvider>
      <CssBaseline />
      <App />
    </ZeitProvider>
  </React.StrictMode>,
  document.getElementById('app')
)
