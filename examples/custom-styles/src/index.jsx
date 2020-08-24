import React from 'react'
import ReactDom from 'react-dom'
import { GeistProvider, CssBaseline } from '@geist-ui/react'
import Home from './home'

const App = () => {
  return (
    <GeistProvider>
      <CssBaseline />
      <Home />
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
