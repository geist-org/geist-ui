import React, { useMemo } from 'react'
import withDefaults from 'components/utils/with-defaults'
import useTheme from 'components/styles/use-theme'
import { ZeitUIThemes } from 'components/styles/themes'

interface Props {
  plain?: number | boolean
}

const defaultProps = {
  plain: false,
}

export type ExampleBlockProps = Props & typeof defaultProps

const getBackground = (theme: ZeitUIThemes, plain: number | boolean) => {
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
  ({ plain, children, ...props }) => {
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

export default withDefaults(ExampleBlock, defaultProps)
