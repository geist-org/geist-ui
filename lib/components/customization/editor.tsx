import React from 'react'
import { Text, Button, useTheme, Themes } from 'components'
import EditorColorItem from './editor-color-item'
import EditorInputItem from './editor-input-item'
import { useConfigs } from 'lib/config-context'
import {
  GeistUIThemesExpressiveness,
  GeistUIThemesLayout,
  GeistUIThemesPalette,
} from 'components/themes'

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
const pageLayout: Array<keyof GeistUIThemesLayout> = [
  'pageWidth',
  'pageWidthWithMargin',
  'pageMargin',
  'radius',
]
const gapLayout: Array<keyof GeistUIThemesLayout> = [
  'gap',
  'gapNegative',
  'gapHalf',
  'gapHalfNegative',
  'gapQuarter',
  'gapQuarterNegative',
]

const Editor = () => {
  const theme = useTheme()
  const DefaultTheme = Themes.getPresetStaticTheme()
  const { updateCustomTheme, isChinese } = useConfigs()

  const resetLayout = () => updateCustomTheme({ layout: DefaultTheme.layout })
  const restColors = () => updateCustomTheme({ palette: DefaultTheme.palette })
  const resetExpressiveness = () => {
    updateCustomTheme({ expressiveness: DefaultTheme.expressiveness })
  }

  return (
    <div className="editor">
      <Text h3>
        {isChinese ? '色彩' : 'Colors'}
        <Button type="abort" auto scale={0.4} onClick={restColors}>
          {isChinese ? '重置' : 'Reset'}
        </Button>
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

      <Text h3>
        {isChinese ? '表现力' : 'Expressiveness'}
        <Button type="abort" auto scale={0.4} onClick={resetExpressiveness}>
          {isChinese ? '重置' : 'Reset'}
        </Button>
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

      <Text h3>
        {isChinese ? '布局' : 'Layout'}
        <Button type="abort" auto scale={0.4} onClick={resetLayout}>
          {isChinese ? '重置' : 'Reset'}
        </Button>
      </Text>
      {isChinese ? (
        <p>大多数的布局间距都依赖这些变量，不合理的更改可能会导致布局失衡。</p>
      ) : (
        <p>
          Most layout spacing depends on these variables, unreasonable changes may cause
          layout imbalance.
        </p>
      )}
      <p className="subtitle">{isChinese ? '基础' : 'basic'}</p>
      <div className="content">
        {pageLayout.map((item, index) => (
          <EditorInputItem key={`${item}-${index}`} groupName="layout" keyName={item} />
        ))}
      </div>
      <p className="subtitle">{isChinese ? '间距' : 'gaps'}</p>
      <div className="content">
        {gapLayout.map((item, index) => (
          <EditorInputItem key={`${item}-${index}`} groupName="layout" keyName={item} />
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

        .editor :global(h3) {
          margin: 2rem 0 1rem 0;
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
