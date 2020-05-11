import React, { useMemo } from 'react'
import useTheme from '../styles/use-theme'
import withDefaults from '../utils/with-defaults'
import { NormalSizes, ButtonTypes } from '../utils/prop-types'
import { ButtonGroupContext, ButtonGroupConfig } from './button-group-context'
import { getButtonColors } from '../button/styles'

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

const ButtonGroup: React.FC<React.PropsWithChildren<ButtonGroupProps>> = ({
  disabled,
  size,
  type,
  ghost,
  vertical,
  children,
  className,
}) => {
  const theme = useTheme()
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

  const { border } = useMemo(() => {
    const results = getButtonColors(theme, type, disabled, ghost)
    if (!ghost && type !== 'default')
      return {
        ...results,
        border: theme.palette.background,
      }
    return results
  }, [theme, type, disabled, ghost])

  return (
    <ButtonGroupContext.Provider value={initialValue}>
      <div className={`btn-group ${vertical ? 'vertical' : 'horizontal'} ${className}`}>
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
