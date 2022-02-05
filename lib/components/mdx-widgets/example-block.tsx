import React, { useMemo } from 'react'
import useTheme from 'components/use-theme'
import { GeistUIThemes } from 'components/themes/presets'

const defaultProps = {
  plain: false,
}

export type ExampleBlockProps = {
  plain?: number | boolean
}

const getBackground = (theme: GeistUIThemes, plain: number | boolean) => {
  if (typeof plain !== 'number') return theme.palette.success

  const colors = [
    theme.palette.accents_1,
    theme.palette.accents_2,
    theme.palette.accents_3,
    theme.palette.accents_4,
    theme.palette.accents_5,
    theme.palette.accents_6,
  ]
  return colors[plain - 1] || theme.palette.success
}

const ExampleBlock: React.FC<React.PropsWithChildren<ExampleBlockProps>> = React.memo(
  ({
    plain,
    children,
    ...props
  }: React.PropsWithChildren<ExampleBlockProps> & typeof defaultProps) => {
    const theme = useTheme()
    const bg = useMemo(() => getBackground(theme, plain), [theme, plain])

    return (
      <div className="block" {...props}>
        {children}
        <style jsx>{`
          .block {
            width: 100%;
            background: ${bg};
            padding: ${theme.layout.gapHalf};
            border-radius: ${theme.layout.radius};
            color: ${theme.palette.background};
            font-size: 0.75rem;
          }
        `}</style>
      </div>
    )
  },
)

ExampleBlock.defaultProps = defaultProps
ExampleBlock.displayName = 'GeistExampleBlock'
export default ExampleBlock
