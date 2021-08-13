import React, { useMemo } from 'react'
import useTheme from '../use-theme'
import { useSelectContext } from './select-context'
import useWarning from '../utils/use-warning'
import Ellipsis from '../shared/ellipsis'
import useScaleable, { withScaleable } from '../use-scaleable'

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
export type SelectOptionProps = Props & NativeAttrs

const SelectOptionComponent: React.FC<React.PropsWithChildren<SelectOptionProps>> = ({
  value: identValue,
  className,
  children,
  disabled,
  divider,
  label,
  preventAllEvents,
  ...props
}: React.PropsWithChildren<SelectOptionProps> & typeof defaultProps) => {
  const theme = useTheme()
  const { SCALES } = useScaleable()
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
    <div
      className={`option ${divider ? 'divider' : ''} ${
        label ? 'label' : ''
      } ${className}`}
      onClick={clickHandler}
      {...props}>
      <Ellipsis height={SCALES.height(2.25)}>{children}</Ellipsis>
      <style jsx>{`
        .option {
          display: flex;
          max-width: 100%;
          justify-content: flex-start;
          align-items: center;
          font-weight: normal;
          background-color: ${bgColor};
          color: ${color};
          user-select: none;
          border: 0;
          cursor: ${isDisabled ? 'not-allowed' : 'pointer'};
          transition: background 0.2s ease 0s, border-color 0.2s ease 0s;
          --select-font-size: ${SCALES.font(0.75)};
          font-size: var(--select-font-size);
          width: ${SCALES.width(1, '100%')};
          height: ${SCALES.height(2.25)};
          padding: ${SCALES.pt(0)} ${SCALES.pr(0.667)} ${SCALES.pb(0)} ${SCALES.pl(0.667)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
        }

        .option:hover {
          background-color: ${hoverBgColor};
          color: ${theme.palette.accents_7};
        }

        .divider {
          line-height: 0;
          overflow: hidden;
          border-top: 1px solid ${theme.palette.border};
          width: ${SCALES.width(1, '100%')};
          height: ${SCALES.height(1, 0)};
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)} ${SCALES.pl(0)};
          margin: ${SCALES.mt(0.5)} ${SCALES.mr(0)} ${SCALES.mb(0.5)} ${SCALES.ml(0)};
        }

        .label {
          color: ${theme.palette.accents_7};
          border-bottom: 1px solid ${theme.palette.border};
          text-transform: capitalize;
          cursor: default;
          font-size: ${SCALES.font(0.875)};
          width: ${SCALES.width(1, '100%')};
          font-weight: 500;
        }
      `}</style>
    </div>
  )
}

SelectOptionComponent.defaultProps = defaultProps
SelectOptionComponent.displayName = 'GeistSelectOption'
const SelectOption = withScaleable(SelectOptionComponent)
export default SelectOption
