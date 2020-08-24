import React from 'react'
import Head from 'next/head'

export interface Meta {
  title: string
}

const toCapitalize = (name: string) => {
  const [first, ...rest] = name
  return `${first.toUpperCase()}${rest.join('')}`
}

const PageHeader: React.FC<{ meta: Meta }> = ({ meta }) => (
  <Head>
    <title>{meta.title ? `${toCapitalize(meta.title)} | ` : ''}React - Geist UI</title>
  </Head>
)

export default PageHeader
