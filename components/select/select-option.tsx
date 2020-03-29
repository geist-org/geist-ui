import React, { useMemo } from 'react'
import withDefaults from '../utils/with-defaults'
import useTheme from '../styles/use-theme'
import { useSelectContext } from './select-context'
import useWarning from '../utils/use-warning'

interface Props {
  value: string
  disabled?: boolean
  className?: string
  preventAllEvents?: boolean
}

const defaultProps = {
  disabled: false,
  className: '',
  preventAllEvents: false,
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type SelectOptionProps = Props & typeof defaultProps & NativeAttrs

const SelectOption: React.FC<React.PropsWithChildren<SelectOptionProps>> = ({
  value: identValue, className, children, disabled, preventAllEvents, ...props
}) => {
  const theme = useTheme()
  const { updateValue, value, disableAll } = useSelectContext()
  const isDisabled = useMemo(() => disabled || disableAll, [disabled, disableAll])
  if (identValue === undefined) {
    useWarning('The props "value" is required.', 'Select Option')
  }

  const selected = useMemo(() => value ? identValue === value : false, [identValue, value])
  
  const bgColor = useMemo(() => {
    if (isDisabled) return theme.palette.accents_1
    return selected ? theme.palette.accents_1 : theme.palette.background
  }, [selected, isDisabled, theme.palette])

  const color = useMemo(() => {
    if (isDisabled) return theme.palette.accents_4
    return selected ? theme.palette.foreground : theme.palette.accents_5
  }, [selected, isDisabled, theme.palette])

  const clickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    if (preventAllEvents) return
    event.stopPropagation()
    event.nativeEvent.stopImmediatePropagation()
    event.preventDefault()
    if (isDisabled) return
    updateValue && updateValue(identValue)
  }

  return (
    <>
      <div className={className} onClick={clickHandler} {...props}>{children}</div>
  
      <style jsx>{`
        div {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          font-weight: normal;
          white-space: pre;
          font-size: .75rem;
          height: calc(1.688 * ${theme.layout.gap});
          padding: 0 ${theme.layout.gapHalf};
          background-color: ${bgColor};
          color: ${color};
          user-select: none;
          border: 0;
          cursor: ${isDisabled ? 'not-allowed' : 'pointer'};
          transition: background 0.2s ease 0s, border-color 0.2s ease 0s;
        }
        
        div:first-of-type {
          border-top-left-radius: ${theme.layout.radius};
          border-top-right-radius: ${theme.layout.radius};
        }
        
        div:last-of-type {
          border-bottom-left-radius: ${theme.layout.radius};
          border-bottom-right-radius: ${theme.layout.radius};
        }
        
        div:hover {
          background-color: ${theme.palette.accents_1};
        }
      `}</style>
    </>
  )
}

export default withDefaults(SelectOption, defaultProps)
