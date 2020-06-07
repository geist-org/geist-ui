import * as React from 'react'
import MyInput from './my-input'
import { ZeitProvider, CssBaseline, Page } from '@zeit-ui/react'

export default function App() {
  return (
    <ZeitProvider>
      <CssBaseline />
      <Page size="mini">
        <MyInput error="this is required" placeholder="my input" />
      </Page>
    </ZeitProvider>
  )
}
