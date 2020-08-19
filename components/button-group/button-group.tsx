import React, { useMemo } from 'react'
import useTheme from '../styles/use-theme'
import withDefaults from '../utils/with-defaults'
import { NormalSizes, ButtonColors, ButtonVariants } from '../utils/prop-types'
import { ButtonGroupContext, ButtonGroupConfig } from './button-group-context'
import { ZeitUIThemesPalette } from 'components/styles/themes'

interface Props {
  ghost?: boolean
  disabled?: boolean
  vertical?: boolean
  size?: NormalSizes
  className?: string
  variant: ButtonVariants
  color: ButtonColors
}

const defaultProps = {
  ghost: false,
  disabled: false,
  vertical: false,
  size: 'medium' as NormalSizes,
  className: '',
  variant: 'line' as ButtonVariants,
  color: 'default' as ButtonColors,
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type ButtonGroupProps = Props & typeof defaultProps & NativeAttrs

const getGroupBorderColors = (palette: ZeitUIThemesPalette, props: ButtonGroupProps): string => {
  const { color, variant } = props
  if (variant === 'solid') return palette.cNeutral8
  const colors: { [key in ButtonColors]?: string } = {
    default: palette.cNeutral2,
    primary: palette.cTheme5,
    secondary: palette.cNeutral7,
    success: palette.success,
    error: palette.error,
    warning: palette.warning,
  }
  const withoutLightType = color.replace('-light', '') as ButtonColors
  return colors[withoutLightType] || (colors.default as string)
}

const ButtonGroup: React.FC<React.PropsWithChildren<ButtonGroupProps>> = groupProps => {
  const theme = useTheme()
  const {
    disabled,
    size,
    color,
    variant,
    ghost,
    vertical,
    children,
    className,
    ...props
  } = groupProps

  const initialValue = useMemo<ButtonGroupConfig>(
    () => ({
      disabled,
      size,
      variant: variant === 'solid' ? variant : 'line',
      color,
      ghost,
      isButtonGroup: true,
    }),
    [disabled, size, color],
  )

  const border = useMemo(() => {
    return getGroupBorderColors(theme.palette, groupProps)
  }, [theme, color, disabled, ghost])

  return (
    <ButtonGroupContext.Provider value={initialValue}>
      <div className={`btn-group ${vertical ? 'vertical' : 'horizontal'} ${className}`} {...props}>
        {children}
        <style jsx>{`
          .btn-group {
            display: inline-flex;
            border-radius: ${theme.expressiveness.R2};
            margin: ${theme.layout.gapQuarter};
            border: ${theme.expressiveness.L1} ${theme.expressiveness.cLineStyle1} ${border};
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
            border-left: ${theme.expressiveness.L1} ${theme.expressiveness.cLineStyle1} ${border};
          }

          .horizontal :global(.btn:not(:last-child)) {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          }

          .vertical :global(.btn:not(:first-child)) {
            border-top-left-radius: 0;
            border-top-right-radius: 0;
            border-top: ${theme.expressiveness.L1} ${theme.expressiveness.cLineStyle1} ${border};
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
