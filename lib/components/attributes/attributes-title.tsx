import React from 'react'
import { Spacer, Code } from 'components'

export interface AttributesTitleProps {
  alias?: string
}

const getAlias = (alias?: string) => {
  if (!alias) return null
  return (
    <small>[alias: <Code>{alias}</Code>]</small>
  )
}

const AttributesTitle: React.FC<React.PropsWithChildren<AttributesTitleProps>> = React.memo(({
  children, alias,
}) => {
  return (
    <>
      <h4 className="title"><Code>{children}</Code>{getAlias(alias)}</h4>
      <Spacer y={.6} />
  
      <style jsx>{`
        h4 {
          display: inline-flex;
          height: 1.6rem;
          line-height: 1.2;
          align-items: center;
        }

        h4 :global(small) {
          font-size: .75em;
          padding-left: 1rem;
        }
      `}</style>
    </>
  )
})

export default AttributesTitle
