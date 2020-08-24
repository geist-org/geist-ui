import * as React from 'react'
import MyInput from './my-input'
import { GeistProvider, CssBaseline, Page } from '@geist-ui/react'

export default function App() {
  return (
    <GeistProvider>
      <CssBaseline />
      <Page size="mini">
        <MyInput error="this is required" placeholder="my input" />
      </Page>
    </GeistProvider>
  )
}
