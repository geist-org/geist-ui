import React from 'react'
import ReactDom from 'react-dom'
import { ZEITUIProvider, CSSBaseline } from '@zeit-ui/react'
import Home from './home'

const App = () => {
  return (
    <ZEITUIProvider>
      <CSSBaseline />
      <Home />
    </ZEITUIProvider>
  )
}

ReactDom.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('app'),
)

export default App
