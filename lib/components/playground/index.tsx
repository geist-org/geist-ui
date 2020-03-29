import React, { MouseEvent, useState } from 'react'
import { LivePreview, LiveProvider, LiveEditor, LiveError } from 'react-live'
import { useClipboard } from 'use-clipboard-copy'
import withDefaults from 'components/utils/with-defaults'
import { useTheme, useToasts } from 'components'
import makeCodeTheme from './code-theme'
import RightIcon from 'lib/components/icons/right'
import CopyIcon from 'lib/components/icons/copy'
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
  title: 'Default',
  desc: '',
  code: '',
  bindings: {},
}

export type PlaygroundProps = Props & typeof defaultProps

const editor = (code: string) => {
  const theme = useTheme()
  const [visible, setVisible] = useState(false)
  const { copy } = useClipboard()
  const [, setToast] = useToasts()
  const clickHandler = (event: MouseEvent<HTMLDetailsElement>) => {
    event.stopPropagation()
    event.preventDefault()
    setVisible(!visible)
  }
  
  const copyHandler = (event: MouseEvent<SVGElement>) => {
    event.stopPropagation()
    event.preventDefault()
    copy(code)
    setToast({ text: 'code copied.' })
  }
  
  return (
    <div className="editor">
      <details open={visible}>
        <summary onClick={clickHandler}>
          <div>
            <RightIcon active={visible} />
            <span>Code Editor</span>
          </div>
          <div>
            {visible && <CopyIcon onClick={copyHandler} />}
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
      `}</style>
    </div>
  )
}

const Playground: React.FC<PlaygroundProps> = React.memo(props => {
  const theme = useTheme()
  const codeTheme = makeCodeTheme(theme)
  const code = props.code.trim()

  return (
    <>
      <Title title={props.title} desc={props.desc} />
      <div className="playground">
        <LiveProvider code={code} scope={props.scope} theme={codeTheme}>
          <div className="wrapper">
            <LivePreview />
            <LiveError />
          </div>
          {editor(code)}
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
