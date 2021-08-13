import React from 'react'
import { Spacer } from 'components'
import VirtualAnchor from 'lib/components/anchor'
import { useConfigs } from '../../config-context'
import Contributors from './contributors'
import AttributesTitle from './attributes-title'
import AttributesTable from './attributes-table'

export interface AttributesProps {
  edit: string
}

const Attributes: React.FC<React.PropsWithChildren<AttributesProps>> = React.memo(
  ({ edit, children }) => {
    const { isChinese } = useConfigs()
    const path = edit.replace('/pages', 'pages')

    return (
      <>
        <Spacer h={5} />
        <h3>
          <VirtualAnchor>APIs</VirtualAnchor>
          {isChinese && ' / 接口文档'}
        </h3>
        <AttributesTable>{children}</AttributesTable>
        <Spacer h={3} />
        <h4 className="contributor-title">{isChinese ? '文档贡献者' : 'Contributors'}</h4>
        <Contributors path={path} />
      </>
    )
  },
)

type AttributesComponent<P> = React.FC<P> & {
  Title: typeof AttributesTitle
  Table: typeof AttributesTable
}

export default Attributes as AttributesComponent<AttributesProps>
