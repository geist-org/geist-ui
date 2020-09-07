import React from 'react'
import ReactDom from 'react-dom'
import { CfxProvider, CssBaseline } from '@cfxjs/react-ui'
import Home from './home'

const App = () => {
  return (
    <CfxProvider>
      <CssBaseline />
      <Home />
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
