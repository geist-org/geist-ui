import React from 'react'
import { Spacer, Code } from 'components'

export interface AttributesTitleProps {
}

const AttributesTitle: React.FC<React.PropsWithChildren<AttributesTitleProps>> = React.memo(({
  children,
}) => {
  return (
    <>
      <h4 className="title"><Code>{children}</Code></h4>
      <Spacer y={.6} />
    </>
  )
})

export default AttributesTitle
