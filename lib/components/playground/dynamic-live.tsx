import React from 'react'
import { LivePreview, LiveProvider, LiveError } from 'react-live'
import { useTheme } from 'components'
import makeCodeTheme from './code-theme'
import Editor from './editor'

export interface Props {
  code: string
  scope: {
    [key: string]: any
  }
}

const DynamicLive: React.FC<Props> = ({ code, scope }) => {
  const theme = useTheme()
  const codeTheme = makeCodeTheme(theme)
  return (
    <LiveProvider code={code} scope={scope} theme={codeTheme}>
      <div className="wrapper">
        <LivePreview />
        <LiveError className="live-error" />
      </div>
      <Editor code={code} />
      <style jsx>{`
        .wrapper {
          width: 100%;
          padding: ${theme.layout.pageMargin};
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
        }
        .wrapper > :global(div) {
          width: 100%;
        }
        .wrapper > :global(.live-error) {
          padding: 10px 12px 0 12px;
          margin-bottom: 0;
          border: 2px ${theme.palette.error} dotted;
          border-radius: 10px;
          color: ${theme.palette.errorLight};
          font-size: 13px;
        }
      `}</style>
    </LiveProvider>
  )
}

export default DynamicLive
