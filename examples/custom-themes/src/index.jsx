import React, { useState } from 'react'
import ReactDom from 'react-dom'
import { GeistProvider, CssBaseline, Page, Text } from '@geist-ui/react'
import { greenTheme, redTheme } from './theme'
import Home from './home'

const App = () => {
  const [theme, setTheme] = useState('light')
  return (
    <GeistProvider themes={[greenTheme, redTheme]} themeType={theme}>
      <CssBaseline />
      <Page size="mini" dotBackdrop>
        <Page.Header>
          <Text h2>Custom themes for Geist UI</Text>
        </Page.Header>
        <Home onThemeChange={next => setTheme(next)} />
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
