import React, { useMemo } from 'react'
import { isObject } from 'components/themes/themes'
import { LiveEditor, LiveProvider } from 'react-live'
import { useConfigs } from 'lib/config-context'
import { CUSTOM_THEME_TYPE } from 'lib/constants'
import CopyIcon from 'components/snippet/snippet-icon'
import makeCodeTheme from 'lib/components/playground/code-theme'
import { Text, Spacer, useTheme, Code, useToasts, Themes, useClipboard } from 'components'

export const getDeepDifferents = <T,>(source: T, target: T): T => {
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

const CustomizationCodes: React.FC<unknown> = () => {
  const DefaultTheme = Themes.getPresetStaticTheme()
  const theme = useTheme()
  const { isChinese } = useConfigs()
  const codeTheme = makeCodeTheme(theme)
  const { copy } = useClipboard()
  const { setToast } = useToasts()

  const deepDifferents = useMemo(
    () => ({
      ...getDeepDifferents(DefaultTheme, theme),
      type: CUSTOM_THEME_TYPE,
    }),
    [DefaultTheme, theme],
  )
  const userCodes = useMemo(() => {
    return `const myTheme = ${JSON.stringify(deepDifferents, null, 2)}

/***
 *  Usage::
 *
 *  export const App = () => {
 *    return (
 *      <GeistProvider themes={[myTheme]} themeType="${CUSTOM_THEME_TYPE}">
 *        <CssBaseline />
 *        <YourComponent />
 *      </GeistProvider>
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
      <h3 className="title">{isChinese ? '主题代码' : 'Theme Codes'}</h3>
      <Spacer h={1} />
      {isChinese ? (
        <Text>
          这里是你所有的变更，点击 <Code>copy</Code> 按钮即可使用在你自己的项目中。
        </Text>
      ) : (
        <Text>
          This is all your changes, click <Code>copy</Code> to use it in your own project.
        </Text>
      )}
      <Spacer h={2} />
      <div className="codes">
        <div className="copy" onClick={copyCode}>
          <CopyIcon />
        </div>
        <LiveProvider code={userCodes} disabled theme={codeTheme}>
          <LiveEditor />
        </LiveProvider>
      </div>
      <Spacer h={5} />
      <style jsx>{`
        .custom-codes {
          display: flex;
          flex-direction: column;
          flex: 1;
          margin: 3rem auto 2.5rem;
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
          padding: calc(0.6 * ${theme.layout.gap}) ${theme.layout.gap};
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
          --snippet-font-size: 16px;
        }

        .copy:hover {
          color: ${theme.palette.accents_6};
        }

        @media only screen and (max-width: ${theme.layout.breakpointMobile}) {
          .title,
          .codes {
            width: 90vw;
          }
        }
      `}</style>
    </div>
  )
}

export default CustomizationCodes
