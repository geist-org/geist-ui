import React from 'react'
import { Text, Button, useTheme, Themes } from 'components'
import EditorColorItem from './editor-color-item'
import EditorInputItem from './editor-input-item'
import RotateCcwIcon from '@geist-ui/icons/rotateCcw'
import { useConfigs } from 'lib/config-context'
import { GeistUIThemesExpressiveness, GeistUIThemesPalette } from 'components/themes'

const basicColors: Array<keyof GeistUIThemesPalette> = [
  'accents_1',
  'accents_2',
  'accents_3',
  'accents_4',
  'accents_5',
  'accents_6',
  'accents_7',
  'accents_8',
  'foreground',
  'background',
]
const statusColors: Array<keyof GeistUIThemesPalette> = [
  'success',
  'successLight',
  'successDark',
  'error',
  'errorLight',
  'errorDark',
  'warning',
  'warningLight',
  'warningDark',
]
const otherColors: Array<keyof GeistUIThemesPalette> = [
  'selection',
  'secondary',
  'link',
  'border',
  'code',
  'cyan',
  'purple',
  'alert',
  'violet',
]
const expressiveness: Array<keyof GeistUIThemesExpressiveness> = [
  'linkStyle',
  'linkHoverStyle',
  'dropdownBoxShadow',
  'shadowSmall',
  'shadowMedium',
  'shadowLarge',
]
// const pageLayout: Array<keyof GeistUIThemesLayout> = [
//   'pageWidth',
//   'pageWidthWithMargin',
//   'pageMargin',
//   'radius',
// ]
// const gapLayout: Array<keyof GeistUIThemesLayout> = [
//   'gap',
//   'gapNegative',
//   'gapHalf',
//   'gapHalfNegative',
//   'gapQuarter',
//   'gapQuarterNegative',
// ]

const Editor = () => {
  const theme = useTheme()
  const DefaultTheme = Themes.getPresetStaticTheme()
  const { updateCustomTheme, isChinese } = useConfigs()

  // const resetLayout = () => updateCustomTheme({ layout: DefaultTheme.layout })
  const restColors = () => updateCustomTheme({ palette: DefaultTheme.palette })
  const resetExpressiveness = () => {
    updateCustomTheme({ expressiveness: DefaultTheme.expressiveness })
  }

  return (
    <div className="editor">
      <Text h3 mt="40px" font="22px">
        {isChinese ? '色彩' : 'Colors'}
        <Button
          type="abort"
          icon={<RotateCcwIcon />}
          auto
          px={0.65}
          scale={0.4}
          ml="10px"
          onClick={restColors}
        />
      </Text>
      <p className="subtitle">{isChinese ? '基础' : 'basic'}</p>
      <div className="content">
        {basicColors.map((item, index) => (
          <EditorColorItem key={`${item}-${index}`} keyName={item} />
        ))}
      </div>
      <p className="subtitle">{isChinese ? '状态' : 'status'}</p>
      <div className="content">
        {statusColors.map((item, index) => (
          <EditorColorItem key={`${item}-${index}`} keyName={item} />
        ))}
      </div>
      <p className="subtitle">{isChinese ? '其他' : 'others'}</p>
      <div className="content">
        {otherColors.map((item, index) => (
          <EditorColorItem key={`${item}-${index}`} keyName={item} />
        ))}
      </div>

      <Text h3 mt="40px">
        {isChinese ? '表现力' : 'Expressiveness'}
        <Button
          type="abort"
          icon={<RotateCcwIcon />}
          auto
          px={0.65}
          scale={0.4}
          ml="10px"
          onClick={resetExpressiveness}
        />
      </Text>
      <p className="subtitle">{isChinese ? '基础' : 'basic'}</p>
      <div className="content">
        {expressiveness.map((item, index) => (
          <EditorInputItem
            key={`${item}-${index}`}
            groupName="expressiveness"
            keyName={item}
          />
        ))}
      </div>
      <style jsx>{`
        .content {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          flex-wrap: wrap;
          width: auto;
          margin: 0 auto;
          padding-left: ${theme.layout.gapQuarter};
        }

        .subtitle {
          color: ${theme.palette.accents_4};
          text-transform: uppercase;
          font-size: 0.75rem;
          margin-top: 2rem;
        }
      `}</style>
    </div>
  )
}

export default Editor
