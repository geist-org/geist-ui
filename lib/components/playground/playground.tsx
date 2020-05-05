import React from 'react'
import { useTheme } from 'components'
import withDefaults from 'components/utils/with-defaults'
import { LivePreview, LiveProvider, LiveError } from 'react-live'
import { useConfigs } from 'lib/config-context'
import makeCodeTheme from './code-theme'
import Editor from './editor'
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

const Playground: React.FC<PlaygroundProps> = React.memo(({
  title: inputTitle, code: inputCode, desc, scope,
}) => {
  const theme = useTheme()
  const { isChinese } = useConfigs()
  const codeTheme = makeCodeTheme(theme)
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
          <Editor code={code} />
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
