import React from 'react'
import { Spacer, Code, useTheme } from 'components'
import VirtualAnchor from 'lib/components/anchor'
import { useConfigs } from 'lib/config-context'

export interface AttributesTitleProps {
  alias?: string
}

const getAlias = (isChinese: boolean, alias?: string) => {
  if (!alias) return null
  return (
    <small>
      <span>[</span>
      {isChinese ? '别名' : 'alias'}: <Code>{alias}</Code>
      <span>]</span>
    </small>
  )
}

const AttributesTitle: React.FC<React.PropsWithChildren<AttributesTitleProps>> = React.memo(
  ({ children, alias }) => {
    const theme = useTheme()
    const { isChinese } = useConfigs()

    return (
      <>
        <h4 className="title">
          <Code>
            <VirtualAnchor pure>{children}</VirtualAnchor>
          </Code>
          {getAlias(!!isChinese, alias)}
        </h4>
        <Spacer y={0.6} />

        <style jsx>{`
          h4 {
            display: inline-flex;
            align-items: center;
            height: 2rem;
            padding-left: ${theme.layout.gapQuarter};
            padding-right: ${theme.layout.gapHalf};
            background-color: ${theme.palette.accents_1};
            border-radius: ${theme.layout.radius};
          }

          h4 :global(small) {
            font-size: 0.65em;
            padding-left: 0.65rem;
            color: ${theme.palette.accents_4};
            align-self: flex-end;
            line-height: 1.6rem;
          }

          h4 :global(span) {
            color: ${theme.palette.accents_6};
          }
        `}</style>
      </>
    )
  },
)

export default AttributesTitle
