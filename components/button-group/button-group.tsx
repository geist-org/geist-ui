import React, { useMemo } from 'react'
import useTheme from '../use-theme'
import { ButtonTypes } from '../utils/prop-types'
import { ButtonGroupContext, ButtonGroupConfig } from './button-group-context'
import { GeistUIThemesPalette } from '../themes/presets'
import useScaleable, { withScaleable } from '../use-scaleable'

interface Props {
  disabled?: boolean
  vertical?: boolean
  ghost?: boolean
  type?: ButtonTypes
  className?: string
}

const defaultProps = {
  disabled: false,
  vertical: false,
  ghost: false,
  type: 'default' as ButtonTypes,
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type ButtonGroupProps = Props & NativeAttrs

const getGroupBorderColors = (
  palette: GeistUIThemesPalette,
  props: ButtonGroupProps & typeof defaultProps,
): string => {
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

const ButtonGroupComponent: React.FC<React.PropsWithChildren<ButtonGroupProps>> = (
  groupProps: ButtonGroupProps & typeof defaultProps,
) => {
  const theme = useTheme()
  const { SCALES } = useScaleable()
  const { disabled, type, ghost, vertical, children, className, ...props } = groupProps
  const initialValue = useMemo<ButtonGroupConfig>(
    () => ({
      disabled,
      type,
      ghost,
      isButtonGroup: true,
    }),
    [disabled, type],
  )

  const border = useMemo(() => {
    return getGroupBorderColors(theme.palette, groupProps)
  }, [theme, type, disabled, ghost])

  return (
    <ButtonGroupContext.Provider value={initialValue}>
      <div
        className={`btn-group ${vertical ? 'vertical' : 'horizontal'} ${className}`}
        {...props}>
        {children}
        <style jsx>{`
          .btn-group {
            display: inline-flex;
            border-radius: ${theme.layout.radius};
            border: 1px solid ${border};
            background-color: transparent;
            overflow: hidden;
            width: ${SCALES.width(1, 'auto')};
            height: ${SCALES.height(1, 'min-content')};
            margin: ${SCALES.mt(0.313)} ${SCALES.mr(0.313)} ${SCALES.mb(0.313)}
              ${SCALES.ml(0.313)};
            padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)} ${SCALES.pl(0)};
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

ButtonGroupComponent.defaultProps = defaultProps
ButtonGroupComponent.displayName = 'GeistButtonGroup'
const ButtonGroup = withScaleable(ButtonGroupComponent)
export default ButtonGroup
