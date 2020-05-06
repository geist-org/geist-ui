import React from 'react'
import ReactDom from 'react-dom'
import { ZEITUIProvider, CSSBaseline } from '@zeit-ui/react'
import Home from './home'
import Theme from './theme'

const App = () => {
  return (
    <ZEITUIProvider theme={Theme}>
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
