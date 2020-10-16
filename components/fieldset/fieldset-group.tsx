import React, { useCallback, useMemo, useState } from 'react'
import useTheme from '../use-theme'
import withDefaults from '../utils/with-defaults'
import useCurrentState from '../utils/use-current-state'
import { FieldsetContext, FieldItem } from './fieldset-context'
import useWarning from '../utils/use-warning'

interface Props {
  value: string
  className?: string
  onChange?: (value: string) => void
}

const defaultProps = {
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type FieldsetGroupProps = Props & typeof defaultProps & NativeAttrs

const FieldsetGroup: React.FC<React.PropsWithChildren<FieldsetGroupProps>> = ({
  className,
  children,
  value,
  onChange,
  ...props
}) => {
  const theme = useTheme()
  const [selfVal, setSelfVal] = useState<string>(value)
  const [items, setItems, ref] = useCurrentState<FieldItem[]>([])

  const register = (newItem: FieldItem) => {
    const hasItem = ref.current.find(item => item.value === newItem.value)
    if (hasItem) {
      useWarning('The "value" of each "Fieldset" must be unique.', 'Fieldset')
    }
    setItems([...ref.current, newItem])
  }

  const providerValue = useMemo(
    () => ({
      currentValue: selfVal,
      inGroup: true,
      register,
    }),
    [selfVal],
  )

  const clickHandle = useCallback(
    (nextValue: string) => {
      setSelfVal(nextValue)
      onChange && onChange(nextValue)
    },
    [onChange],
  )

  return (
    <FieldsetContext.Provider value={providerValue}>
      <div className={` ${className}`} {...props}>
        <div className="group">
          {items.map(item => (
            <button
              onClick={() => clickHandle(item.value)}
              key={item.value}
              className={selfVal === item.value ? 'active' : ''}>
              {item.label}
            </button>
          ))}
        </div>
        <div className="group-content">{children}</div>
        <style jsx>{`
          .group {
            white-space: nowrap;
            overflow-y: hidden;
            overflow-x: auto;
            margin-bottom: -1px;
          }

          .group-content {
            border-top-left-radius: 0;
            overflow: hidden;
          }

          .group-content :global(.fieldset) {
            border-top-left-radius: 0;
          }

          button {
            height: 34px;
            text-align: center;
            user-select: none;
            color: ${theme.palette.accents_3};
            background-color: ${theme.palette.accents_1};
            font-size: 0.875rem;
            white-space: nowrap;
            text-transform: capitalize;
            line-height: 0;
            -webkit-appearance: none;
            cursor: pointer;
            margin: 0;
            padding: 0 ${theme.layout.gap};
            overflow: hidden;
            transition: all 0.2s ease 0s;
            border-radius: 0;
            border: 1px solid ${theme.palette.border};
            text-decoration: none;
            outline: none;
          }

          button.active {
            border-bottom-color: transparent;
            background-color: ${theme.palette.background};
            color: ${theme.palette.foreground};
            cursor: default;
          }

          button:first-of-type {
            border-top-left-radius: ${theme.layout.radius};
          }

          button:last-of-type {
            border-top-right-radius: ${theme.layout.radius};
          }

          button + button {
            border-left: 0;
          }
        `}</style>
      </div>
    </FieldsetContext.Provider>
  )
}

export default withDefaults(FieldsetGroup, defaultProps)
