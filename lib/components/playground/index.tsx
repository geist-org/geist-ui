import React, { useState } from 'react'
import { LivePreview, LiveProvider, LiveEditor, LiveError } from 'react-live'
import withDefaults from 'components/utils/with-defaults'
import useClipboard from 'components/utils/use-clipboard'
import { useTheme, useToasts } from 'components'
import { useConfigs } from '../../config-context'
import makeCodeTheme from './code-theme'
import RightIcon from '@zeit-ui/react-icons/chevronRight'
import CopyIcon from '@zeit-ui/react-icons/copy'
// import RightIcon from 'lib/components/icons/right'
// import CopyIcon from 'lib/components/icons/copy'
import Title from './title'

interface Props {
  title?: React.ReactNode | string
  desc?: string
  code: string
  scope: {
    [key: string]: any
  }
}

const defaultProps = {
  desc: '',
  code: '',
  bindings: {},
}

export type PlaygroundProps = Props & typeof defaultProps

const editor = (code: string, copy: Function, isChinese: boolean) => {
  const theme = useTheme()
  const [visible, setVisible] = useState(false)
  
  const [, setToast] = useToasts()
  const clickHandler = (event: React.MouseEvent) => {
    event.stopPropagation()
    event.preventDefault()
    setVisible(!visible)
  }
  
  const copyHandler = (event: React.MouseEvent) => {
    event.stopPropagation()
    event.preventDefault()
    copy(code)
    setToast({ text: isChinese ? '代码已拷贝至剪切板。' : 'code copied.' })
  }
  
  return (
    <div className="editor">
      <details open={visible}>
        <summary onClick={clickHandler}>
          <div>
            <span className="right-icon">
              <RightIcon size={16} />
            </span>
            <span>{isChinese ? '编辑代码' : 'Code Editor'}</span>
          </div>
          <div>
            {visible && (
              <span className="copy" onClick={copyHandler} title={isChinese ? '拷贝代码' : 'Copy Code'}>
                <CopyIcon size={18} />
              </span>
            )}
          </div>
        </summary>
        <div className="area">
          <LiveEditor />
        </div>
      </details>
      
      <style jsx>{`
        .editor {
          border-bottom-left-radius: ${theme.layout.radius};
          border-bottom-right-radius: ${theme.layout.radius};
        }
        
        details {
          transition: all 0.2s ease;
          overflow: hidden;
        }
        
        summary {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 ${theme.layout.gapHalf};
          border-top: 1px solid ${theme.palette.accents_2};
          color: ${theme.palette.accents_5};
          height: 2.875rem;
          list-style: none;
          user-select: none;
          outline: none;
        }
        
        summary > div {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          width: fit-content;
        }
        
        summary :global(svg) {
          margin: 0 ${theme.layout.gapHalf};
          cursor: pointer;
        }
        
        .area {
          position: relative;
          box-sizing: border-box;
          white-space: pre;
          font-family: ${theme.font.mono};
          color: ${theme.palette.foreground};
          background-color: ${theme.palette.background};
          font-size: 1em;
          overflow: hidden;
          border-top: 1px solid ${theme.palette.accents_2};
          padding: ${theme.layout.gapHalf};
        }
        
        .right-icon {
          transition: all .2s ease;
          transform: rotate(${visible ? 90 : 0}deg);
          display: inline-flex;
          align-items: center;
        }
        
        .copy {
          display: inline-flex;
          align-items: center;
          color: ${theme.palette.accents_4};
          transition: color .2s ease;
        }
        
        .copy:hover {
          color: ${theme.palette.accents_6};
        }
      `}</style>
    </div>
  )
}

const Playground: React.FC<PlaygroundProps> = React.memo(({
  title: inputTitle, code: inputCode, desc, scope,
}) => {
  const theme = useTheme()
  const { isChinese } = useConfigs()
  const codeTheme = makeCodeTheme(theme)
  const { copy } = useClipboard()
  const code = inputCode.trim()
  const title = inputTitle || (isChinese ? '基础的' : 'Default')

  return (
    <>
      <Title title={title} desc={desc} />
      <div className="playground">
        <LiveProvider code={code} scope={scope} theme={codeTheme}>
          <div className="wrapper">
            <LivePreview />
            <LiveError />
          </div>
          {editor(code, copy, !!isChinese)}
        </LiveProvider>
    
        <style jsx>{`
        .playground {
          width: 100%;
          border-radius: ${theme.layout.radius};
          border: 1px solid ${theme.palette.accents_2};
        }
        
        .wrapper {
          width: 100%;
          padding: ${theme.layout.pageMargin};
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
        }
      `}</style>
      </div>
    </>
  )
})

export default withDefaults(Playground, defaultProps)
