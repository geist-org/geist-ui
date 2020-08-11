import React, { useState } from 'react'
import { Card, Input, Modal, useModal, Snippet } from 'components'
import * as Icon from '@zeit-ui/react-icons'
import IconsCell, { getImportString } from './icons-cell'
import { useConfigs } from 'lib/config-context'

const ImportSnippet: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <Snippet>
      {children}
      <style jsx>{`
        :global(pre:before) {
          display: none;
        }
      `}</style>
    </Snippet>
  )
}

const Icons: React.FC = () => {
  const { isChinese } = useConfigs()
  const { setVisible, bindings: modalBindings } = useModal()
  const [inputValue, setInputValue] = useState('')
  const [importStr, setImportStr] = useState({ title: '', single: '', normal: '' })
  const icons = Object.entries(Icon).filter(
    ([name]) => !inputValue || name.toLowerCase().includes(inputValue.toLowerCase()),
  )
  const onCellClick = (name: string) => {
    const { single, normal } = getImportString(name)
    setImportStr({ title: name, single, normal })
    setVisible(true)
  }

  return (
    <>
      <h3 className="title">{isChinese ? '图标画廊' : 'Icons Gallery'}</h3>
      <Card>
        <Input
          width="100%"
          icon={<Icon.Search />}
          placeholder={isChinese ? '搜索' : 'Search'}
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
        <div className="icons-grid">
          {icons.map(([name, component], index) => (
            <IconsCell
              name={name}
              component={component}
              key={`${name}-${index}`}
              onClick={onCellClick}
            />
          ))}
        </div>
        <Modal {...modalBindings}>
          <Modal.Title>{importStr.title}</Modal.Title>
          <Modal.Content>
            <p>{isChinese ? '引入:' : 'Import:'}</p>
            <ImportSnippet>{importStr.normal}</ImportSnippet>
            <p>{isChinese ? '引入单个组件:' : 'Import single component:'}</p>
            <ImportSnippet>{importStr.single}</ImportSnippet>
          </Modal.Content>
        </Modal>
      </Card>
      <style jsx>{`
        .title {
          line-height: 1;
          margin-top: 75px;
          margin-bottom: 30px;
        }

        :global(input) {
          margin-bottom: 4px !important;
        }

        .icons-grid {
          display: flex;
          flex-wrap: wrap;
          margin-top: 8pt;
          justify-content: space-around;
        }
      `}</style>
    </>
  )
}

export default Icons
