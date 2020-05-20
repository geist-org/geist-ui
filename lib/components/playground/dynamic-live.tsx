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
        <LiveError />
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
      `}</style>
    </LiveProvider>
  )
}

export default DynamicLive
