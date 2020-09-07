import * as React from 'react'
import MyInput from './my-input'
import { CfxProvider, CssBaseline, Page } from '@cfxjs/react-ui'

export default function App() {
  return (
    <CfxProvider>
      <CssBaseline />
      <Page size="mini">
        <MyInput error="this is required" placeholder="my input" />
      </Page>
    </CfxProvider>
  )
}
