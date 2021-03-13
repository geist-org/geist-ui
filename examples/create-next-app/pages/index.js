import { Page, Text } from '@geist-ui/react'

export default function Home() {
  return (
    <Page dotBackdrop size="mini">
      <Page.Header>
        <Text h2>React Application with Geist UI</Text>
      </Page.Header>
      <Text>
        Hello, I am using <Text b>Geist UI</Text> !
      </Text>
    </Page>
  )
}
