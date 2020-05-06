import React, { useMemo } from 'react'
import { useTheme, useToasts, Code, ZeitUIThemesPalette } from 'components'
import useClipboard from 'components/utils/use-clipboard'
import { getColorData, getCurrentColor } from './colors-data'

interface Props {
  type: string
}

const getColorItem = (type: string, palette: ZeitUIThemesPalette, copy: Function) => {
  const data = getColorData(type)
  const getColor = (index: number) => getCurrentColor(palette, type, index)
  const keys = Object.keys(data)

  return (keys as Array<keyof ZeitUIThemesPalette>).map((key, index) => (
    <div className="color" key={`color-item-${index}`}>
      <h4>{data[key]}</h4>
      <span className="usage" onClick={() => copy(`theme.palette.${key}`)}>
        theme.palette.{key}
      </span>
      <span className="value" onClick={() => copy(palette[key])}>
        {palette[key]}
      </span>
      <style jsx>{`
        .color {
          background-color: ${palette[key]};
          color: ${getColor(index)};
        }
      `}</style>
    </div>
  ))
}

const Colors: React.FC<Props> = ({ type }) => {
  const theme = useTheme()
  const { copy } = useClipboard()
  const [, setToast] = useToasts()
  const copyText = (text: string) => {
    copy(text)
    setToast({
      text: (
        <span>
          Copied <Code>{text}</Code>
        </span>
      ),
    })
  }
  const colorItems = useMemo(() => getColorItem(type, theme.palette, copyText), [
    type,
    theme.palette,
  ])

  return (
    <div className="colors">
      {colorItems}
      <style jsx>{`
        .colors {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .colors :global(.color) {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: ${theme.layout.gap};
          height: 6rem;
          position: relative;
          cursor: pointer;
          user-select: none;
        }

        .colors :global(.color:first-child) {
          border-top-left-radius: ${theme.layout.radius};
          border-top-right-radius: ${theme.layout.radius};
        }

        .colors :global(.color:last-child) {
          border-bottom-left-radius: ${theme.layout.radius};
          border-bottom-right-radius: ${theme.layout.radius};
        }

        .colors :global(.color h4) {
          margin: 0;
        }

        .colors :global(.usage) {
          font-size: 0.875rem;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          padding: 1rem;
        }

        .colors :global(.value) {
          font-size: 0.875rem;
          text-transform: uppercase;
          padding: 1rem 0;
        }
      `}</style>
    </div>
  )
}

export default Colors
