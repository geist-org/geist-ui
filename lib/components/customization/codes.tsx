import React, { useMemo } from 'react'
import { Text, Spacer, useTheme, Code, useToasts } from 'components'
import DefaultTheme from 'components/styles/themes/default'
import { isObject, MergeObject } from 'components/styles/theme-provider/theme-provider'
import { LiveEditor, LiveProvider } from 'react-live'
import makeCodeTheme from 'lib/components/playground/code-theme'
import useClipboard from 'components/utils/use-clipboard'
import CopyIcon from 'components/snippet/snippet-icon'

export const getDeepDifferents = <T extends MergeObject,>(source: T, target: T): T => {
  if (!isObject(target) || !isObject(source)) return target
  
  const sourceKeys = Object.keys(source) as Array<keyof T>
  let result = {} as T
  for (const key of sourceKeys) {
    const sourceValue = source[key]
    const targetValue = target[key]
    
    if (isObject(sourceValue) && isObject(targetValue)) {
      const childrenDiff = getDeepDifferents(sourceValue, { ...targetValue })
      if (Object.keys(childrenDiff).length !== 0) {
        result[key] = childrenDiff
      }
    } else if (sourceValue !== targetValue) {
      result[key] = targetValue
    }
  }
  return result
}

const CustomizationCodes = () => {
  const theme = useTheme()
  const codeTheme = makeCodeTheme(theme)
  const { copy } = useClipboard()
  const [, setToast] = useToasts()

  const deepDifferents = useMemo(
    () => getDeepDifferents(DefaultTheme, theme),
    [DefaultTheme, theme],
  )
  const userCodes = useMemo(() => {
    return `const myTheme = ${JSON.stringify(deepDifferents, null, 2)}

/***
 *  Usage::
 *  export const App = () => {
 *    return (
 *      <ZEITUIProvider theme={myTheme}>
 *        <CSSBaseline />
 *        <YourComponent />
 *      </ZEITUIProvider>
 *    )
 *  }
 **/`
  }, [deepDifferents])
  
  const copyCode = () => {
    copy(userCodes)
    setToast({ text: 'Theme code copied.' })
  }

  return (
    <div className="custom-codes">
      <h3 className="title">Theme Codes</h3>
      <Text>This is all your changes, click <Code>copy</Code> to use it in your own project.</Text>
      <Spacer y={2} />
      <div className="codes">
        <div className="copy" onClick={copyCode}><CopyIcon /></div>
        <LiveProvider code={userCodes} disabled theme={codeTheme}>
          <LiveEditor />
        </LiveProvider>
      </div>
      <Spacer y={5} />
      <style jsx>{`
        .custom-codes {
          display: flex;
          flex-direction: column;
          flex: 1;
          margin: 2.5rem auto;
          text-align: center;
        }
        
        .title {
          text-align: center;
          width: 80%;
          margin: 0 auto;
          display: inline-block;
          background: ${theme.palette.foreground};
          color: ${theme.palette.background};
          font-size: 1rem;
          line-height: 1rem;
          padding: ${theme.layout.gap} 0;
          text-transform: uppercase;
          letter-spacing: 1.5px;
        }
        
        .codes {
          width: 80%;
          margin: 0 auto;
          border: 1px solid ${theme.palette.border};
          border-radius: ${theme.layout.radius};
          overflow: hidden;
          padding: calc(.6 * ${theme.layout.gap}) ${theme.layout.gap};
          position: relative;
        }
        
        .copy {
          position: absolute;
          right: 1rem;
          top: 1rem;
          z-index: 2000;
          color: ${theme.palette.accents_3};
          cursor: pointer;
          user-select: none;
          transition: color 200ms ease;
        }
        
        .copy:hover {
          color: ${theme.palette.accents_6};
        }
        
        @media only screen and (max-width: ${theme.layout.breakpointMobile}) {
          .title, .codes {
            width: 90vw;
          }
        }
      `}</style>
    </div>
  )
}

export default CustomizationCodes
