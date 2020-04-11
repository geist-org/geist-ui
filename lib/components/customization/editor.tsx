import React from 'react'
import { Text, Button, useTheme, ZeitUIThemesPalette, ZeitUIThemesExpressiveness, ZeitUIThemesLayout } from 'components'
import EditorColorItem from './editor-color-item'
import EditorInputItem from './editor-input-item'
import DefaultTheme from 'components/styles/themes/default'
import { useConfigs } from 'lib/config-context'

const basicColors: Array<keyof ZeitUIThemesPalette> = [
  'accents_1', 'accents_2', 'accents_3', 'accents_4', 'accents_5', 'accents_6',
  'accents_7', 'accents_8', 'foreground', 'background',
]
const statusColors: Array<keyof ZeitUIThemesPalette> = [
  'success', 'successLight', 'successDark', 'error', 'errorLight', 'errorDark',
  'warning', 'warningLight', 'warningDark',
]
const otherColors: Array<keyof ZeitUIThemesPalette> = [
  'selection', 'secondary', 'link', 'border', 'code', 'cyan', 'purple', 'alert', 'violet'
]
const expressiveness: Array<keyof ZeitUIThemesExpressiveness> = [
  'linkStyle', 'linkHoverStyle', 'dropdownBoxShadow', 'shadowSmall',
  'shadowMedium', 'shadowLarge',
]
const pageLayout: Array<keyof ZeitUIThemesLayout> = [
  'pageWidth', 'pageWidthWithMargin', 'pageMargin', 'radius',
]
const gapLayout: Array<keyof ZeitUIThemesLayout> = [
  'gap', 'gapNegative', 'gapHalf', 'gapHalfNegative', 'gapQuarter', 'gapQuarterNegative',
]

const Editor = () => {
  const theme = useTheme()
  const { updateCustomTheme } = useConfigs()
  
  const resetLayout = () => updateCustomTheme({ layout: DefaultTheme.layout })
  const restColors = () => updateCustomTheme({ palette: DefaultTheme.palette })
  const resetExpressiveness = () => {
    updateCustomTheme({ expressiveness: DefaultTheme.expressiveness })
  }
  
  return (
    <div className="editor">
      <Text h3>Colors <Button type="abort" auto size="mini" onClick={restColors}>Reset</Button></Text>
      <p className="subtitle">basic</p>
      <div className="content">
        {basicColors.map((item, index) => (
          <EditorColorItem key={`${item}-${index}`} keyName={item} />
        ))}
      </div>
      <p className="subtitle">status</p>
      <div className="content">
        {statusColors.map((item, index) => (
          <EditorColorItem key={`${item}-${index}`} keyName={item} />
        ))}
      </div>
      <p className="subtitle">others</p>
      <div className="content">
        {otherColors.map((item, index) => (
          <EditorColorItem key={`${item}-${index}`} keyName={item} />
        ))}
      </div>
  
      <Text h3>Expressiveness <Button type="abort" auto size="mini" onClick={resetExpressiveness}>Reset</Button></Text>
      <p className="subtitle">basic</p>
      <div className="content">
        {expressiveness.map((item, index) => (
          <EditorInputItem key={`${item}-${index}`} groupName="expressiveness" keyName={item} />
        ))}
      </div>
  
      <Text h3>Layout <Button type="abort" auto size="mini" onClick={resetLayout}>Reset</Button></Text>
      <p className="subtitle">basic</p>
      <div className="content">
        {pageLayout.map((item, index) => (
          <EditorInputItem key={`${item}-${index}`} groupName="layout" keyName={item} />
        ))}
      </div>
      <p className="subtitle">gaps</p>
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
        }
        
        .editor :global(h3) {
          margin: 2rem 0 1rem 0;
        }
        
        .subtitle {
          color: ${theme.palette.accents_4};
          text-transform: uppercase;
          font-size: .75rem;
          margin-top: 2rem;
        }
      `}</style>
    </div>
  )
}

export default Editor
