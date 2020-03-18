import { NextPage } from 'next'
import Head from 'next/head'

export interface Props {
  metaRedirect?: boolean,
}

const redirect = (destination: string) => {
  const Home: NextPage<Props> = ({ metaRedirect }) => {
    if (!metaRedirect) return null
    return (
      <Head>
        <meta httpEquiv="refresh" content={`0; url=${destination}`} />
      </Head>
    )
  }
  
  Home.getInitialProps = async ({ res }): Promise<Props> => {
    if (res) {
      res.writeHead(302, { Location: destination })
      res.end()
      return {}
    }
    
    return { metaRedirect: true }
  }
  
  return Home
}

export default redirect
