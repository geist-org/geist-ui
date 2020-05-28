import React, { useMemo } from 'react'
import withDefaults from '../utils/with-defaults'
import useTheme from '../styles/use-theme'
import { useSelectContext } from './select-context'
import useWarning from '../utils/use-warning'

interface Props {
  value?: string
  disabled?: boolean
  className?: string
  divider?: boolean
  label?: boolean
  preventAllEvents?: boolean
}

const defaultProps = {
  disabled: false,
  divider: false,
  label: false,
  className: '',
  preventAllEvents: false,
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type SelectOptionProps = Props & typeof defaultProps & NativeAttrs

const SelectOption: React.FC<React.PropsWithChildren<SelectOptionProps>> = ({
  value: identValue,
  className,
  children,
  disabled,
  divider,
  label,
  preventAllEvents,
  ...props
}) => {
  const theme = useTheme()
  const { updateValue, value, disableAll } = useSelectContext()
  const isDisabled = useMemo(() => disabled || disableAll, [disabled, disableAll])
  const isLabel = useMemo(() => label || divider, [label, divider])
  if (!isLabel && identValue === undefined) {
    useWarning('The props "value" is required.', 'Select Option')
  }

  const selected = useMemo(() => {
    if (!value) return false
    if (typeof value === 'string') {
      return identValue === value
    }
    return value.includes(`${identValue}`)
  }, [identValue, value])

  const bgColor = useMemo(() => {
    if (isDisabled) return theme.palette.accents_1
    return selected ? theme.palette.accents_2 : theme.palette.background
  }, [selected, isDisabled, theme.palette])

  const hoverBgColor = useMemo(() => {
    if (isDisabled || isLabel || selected) return bgColor
    return theme.palette.accents_1
  }, [selected, isDisabled, theme.palette, isLabel, bgColor])

  const color = useMemo(() => {
    if (isDisabled) return theme.palette.accents_4
    return selected ? theme.palette.foreground : theme.palette.accents_5
  }, [selected, isDisabled, theme.palette])

  const clickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    if (preventAllEvents) return
    event.stopPropagation()
    event.nativeEvent.stopImmediatePropagation()
    event.preventDefault()
    if (isDisabled || isLabel) return
    updateValue && updateValue(identValue)
  }

  return (
    <>
      <div
        className={`option ${divider ? 'divider' : ''} ${label ? 'label' : ''} ${className}`}
        onClick={clickHandler}
        {...props}>
        <span>{children}</span>
      </div>

      <style jsx>{`
        .option {
          display: flex;
          max-width: 100%;
          justify-content: flex-start;
          align-items: center;
          font-weight: normal;
          font-size: 0.75rem;
          height: calc(1.688 * ${theme.layout.gap});
          padding: 0 ${theme.layout.gapHalf};
          background-color: ${bgColor};
          color: ${color};
          user-select: none;
          border: 0;
          cursor: ${isDisabled ? 'not-allowed' : 'pointer'};
          transition: background 0.2s ease 0s, border-color 0.2s ease 0s;
        }

        span {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          min-width: 0;
        }

        .option:hover {
          background-color: ${hoverBgColor};
          color: ${theme.palette.accents_7};
        }

        .divider {
          line-height: 0;
          height: 0;
          padding: 0;
          overflow: hidden;
          border-top: 1px solid ${theme.palette.border};
          margin: 0.5rem 0;
          width: 100%;
        }

        .label {
          font-size: 0.875rem;
          color: ${theme.palette.accents_7};
          border-bottom: 1px solid ${theme.palette.border};
          text-transform: capitalize;
          cursor: default;
        }
      `}</style>
    </>
  )
}

export default withDefaults(SelectOption, defaultProps)
