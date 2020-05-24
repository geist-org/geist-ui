import Head from 'next/head'
import { Text, Card, Note, Code, Spacer } from '@zeit-ui/react'

export default function Page() {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
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
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  )
}
