import Head from 'next/head'
import { Page, Text, Card, Note, Code, Spacer } from '@zeit-ui/react'

export default function Home() {
  return (
    <Page>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Text h1>
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </Text>
      <Card>
        hello, world. I am using <Code>@zeit-ui/react</Code> !
      </Card>
      <Spacer y={1.5} />
      <Card shadow>
        <Note type="success">This note details something important.</Note>
      </Card>
    </Page>
  )
}
