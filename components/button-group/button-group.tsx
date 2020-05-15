import React, { useMemo } from 'react'
import useTheme from '../styles/use-theme'
import withDefaults from '../utils/with-defaults'
import { NormalSizes, ButtonTypes } from '../utils/prop-types'
import { ButtonGroupContext, ButtonGroupConfig } from './button-group-context'
import { ZeitUIThemesPalette } from 'components/styles/themes'

interface Props {
  disabled?: boolean
  vertical?: boolean
  ghost?: boolean
  size?: NormalSizes
  type?: ButtonTypes
  className?: string
}

const defaultProps = {
  disabled: false,
  vertical: false,
  ghost: false,
  size: 'medium' as NormalSizes,
  type: 'default' as ButtonTypes,
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type ButtonGroupProps = Props & typeof defaultProps & NativeAttrs

const getGroupBorderColors = (palette: ZeitUIThemesPalette, props: ButtonGroupProps): string => {
  const { ghost, type } = props
  if (!ghost && type !== 'default') return palette.background
  const colors: { [key in ButtonTypes]?: string } = {
    default: palette.border,
    success: palette.success,
    secondary: palette.secondary,
    error: palette.error,
    warning: palette.warning,
  }
  const withoutLightType = type.replace('-light', '') as ButtonTypes
  return colors[withoutLightType] || (colors.default as string)
}

const ButtonGroup: React.FC<React.PropsWithChildren<ButtonGroupProps>> = groupProps => {
  const theme = useTheme()
  const { disabled, size, type, ghost, vertical, children, className, ...props } = groupProps
  const initialValue = useMemo<ButtonGroupConfig>(
    () => ({
      disabled,
      size,
      type,
      ghost,
      isButtonGroup: true,
    }),
    [disabled, size, type],
  )

  const border = useMemo(() => {
    return getGroupBorderColors(theme.palette, groupProps)
  }, [theme, type, disabled, ghost])

  return (
    <ButtonGroupContext.Provider value={initialValue}>
      <div className={`btn-group ${vertical ? 'vertical' : 'horizontal'} ${className}`} {...props}>
        {children}
        <style jsx>{`
          .btn-group {
            display: inline-flex;
            border-radius: ${theme.layout.radius};
            margin: ${theme.layout.gapQuarter};
            border: 1px solid ${border};
            background-color: transparent;
            overflow: hidden;
            height: min-content;
          }

          .vertical {
            flex-direction: column;
          }

          .btn-group :global(.btn) {
            border: none;
          }

          .btn-group :global(.btn .text) {
            top: 0;
          }

          .horizontal :global(.btn:not(:first-child)) {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            border-left: 1px solid ${border};
          }

          .horizontal :global(.btn:not(:last-child)) {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          }

          .vertical :global(.btn:not(:first-child)) {
            border-top-left-radius: 0;
            border-top-right-radius: 0;
            border-top: 1px solid ${border};
          }

          .vertical :global(.btn:not(:last-child)) {
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
          }
        `}</style>
      </div>
    </ButtonGroupContext.Provider>
  )
}

const MemoButtonGroup = React.memo(ButtonGroup)

export default withDefaults(MemoButtonGroup, defaultProps)
