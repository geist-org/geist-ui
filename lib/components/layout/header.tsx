import React, { useMemo } from 'react'
import Head from 'next/head'

export interface Meta {
  title: string
}

const toCapitalize = (name: string) => {
  const [first, ...rest] = name
  return `${first.toUpperCase()}${rest.join('')}`
}

const PageHeader: React.FC<{ meta: Meta }> = ({ meta }) => {
  const capitalizeTitle = useMemo(() => {
    if (!meta.title) return ''
    if (meta.title.toLowerCase().startsWith('use')) return `${meta.title} - `
    return `${toCapitalize(meta.title)} - `
  }, [meta.title])
  return (
    <Head>
      <title>{capitalizeTitle}Geist UI</title>
    </Head>
  )
}

export default PageHeader
