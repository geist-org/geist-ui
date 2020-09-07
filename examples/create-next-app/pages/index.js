import Head from 'next/head'
import { Page, Text, Card, Note, Code, Spacer } from '@cfxjs/react-ui'

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
        hello, world. I am using <Code>@cfxjs/react-ui</Code> !
      </Card>
      <Spacer y={1.5} />
      <Card shadow>
        <Note type="success">This note details something important.</Note>
      </Card>
    </Page>
  )
}
