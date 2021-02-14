import React, { useMemo } from 'react'
import withDefaults from '../utils/with-defaults'
import useTheme from '../use-theme'
import { GeistUIThemes } from '../themes/presets'

interface Props {
  command?: boolean
  shift?: boolean
  option?: boolean
  ctrl?: boolean
  small?: boolean
  className?: string
}

const defaultProps = {
  command: false,
  shift: false,
  option: false,
  ctrl: false,
  small: false,
  className: '',
}

type NativeAttrs = Omit<React.KeygenHTMLAttributes<any>, keyof Props>
export type KeyboardProps = Props & typeof defaultProps & NativeAttrs

type CustomLayout = {
  padding: number | string
  fontSize: string
  minWidth: string
}

const getLayout = (small: boolean, theme: GeistUIThemes): CustomLayout => {
  if (small)
    return {
      padding: 0,
      fontSize: '.75rem',
      minWidth: theme.layout.gap,
    }
  return {
    padding: theme.layout.gapQuarter,
    fontSize: '0.875rem',
    minWidth: `calc(1.5 * ${theme.layout.gap})`,
  }
}

const Keyboard: React.FC<React.PropsWithChildren<KeyboardProps>> = ({
  command,
  shift,
  option,
  ctrl,
  small,
  children,
  className,
  ...props
}) => {
  const theme = useTheme()
  const { padding, fontSize, minWidth } = useMemo<CustomLayout>(
    () => getLayout(small, theme),
    [small, theme],
  )

  return (
    <kbd className={className} {...props}>
      {command && <span>⌘</span>}
      {shift && <span>⇧</span>}
      {option && <span>⌥</span>}
      {ctrl && <span>⌃</span>}
      {children && <span>{children}</span>}

      <style jsx>{`
        kbd {
          width: fit-content;
          line-height: 2em;
          text-align: center;
          display: inline-block;
          color: ${theme.palette.accents_5};
          background-color: ${theme.palette.accents_1};
          font-family: ${theme.font.sans};
          border-radius: ${theme.layout.radius};
          border: 1px solid ${theme.palette.accents_2};
          padding: 0 ${padding};
          min-width: ${minWidth};
          font-size: ${fontSize};
        }

        kbd + kbd {
          margin-left: ${theme.layout.gapQuarter};
        }

        span {
          line-height: 2em;
          font-size: 0.875rem;
          text-align: center;
        }

        span + span {
          margin-left: ${theme.layout.gapQuarter};
        }
      `}</style>
    </kbd>
  )
}

const MemoKeyboard = React.memo(Keyboard)

export default withDefaults(MemoKeyboard, defaultProps)
