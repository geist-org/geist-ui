import React, { useMemo } from 'react'
import withDefaults from '../utils/with-defaults'
import Check from '@zeit-ui/react-icons/check'
import useTheme from '../styles/use-theme'
import { colorToRgbValues } from '../utils/color'
import { useSelectContext } from './select-context'
import { getOptionColors } from './styles'
import useWarning from '../utils/use-warning'
import Ellipsis from '../shared/ellipsis'

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
  const { updateValue, value, disableAll, variant } = useSelectContext()
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

  const rgb = colorToRgbValues(theme.palette.cTheme5)
  const colors = useMemo(() => {
    return getOptionColors(selected, isDisabled, theme.palette, isLabel, variant, rgb)
  }, [selected, isDisabled, theme.palette, isLabel])

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
        <Ellipsis height={`calc(2.25 * ${theme.layout.gap})`}>{children}</Ellipsis>
        {selected && <Check size={18} />}
      </div>

      <style jsx>{`
        .option {
          display: flex;
          max-width: 100%;
          justify-content: space-between;
          align-items: center;
          font-weight: normal;
          font-size: 0.75rem;
          height: calc(2.5 * ${theme.layout.gap});
          box-sizing: border-box;
          padding: 0 ${theme.layout.gap};
          background-color: ${colors.bgColor};
          color: ${colors.color};
          user-select: none;
          border: 1px solid ${colors.border};
          cursor: ${isDisabled ? 'not-allowed' : 'pointer'};
          transition: background 0.2s ease 0s, border-color 0.2s ease 0s;
        }

        .option:hover {
          background-color: ${colors.hoverBgColor};
          color: ${colors.hoverColor};
          border: 1px solid ${colors.hoverBorder};
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
          color: ${colors.color};
          border-bottom: 1px solid ${theme.palette.border};
          text-transform: capitalize;
          cursor: default;
        }
      `}</style>
    </>
  )
}

export default withDefaults(SelectOption, defaultProps)
