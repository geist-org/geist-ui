import React, { MutableRefObject, useEffect, useMemo, useRef, useState } from 'react'
import useTheme from '../styles/use-theme'
import SelectOption from './select-option'
import SelectIcon from './select-icon'
import Dropdown from '../shared/dropdown'
import { ZeitUIThemes } from '../styles/themes'
import { SelectContext, SelectConfig } from './select-context'
import { NormalSizes } from '../utils/prop-types'
import { getSizes } from './styles'
import { pickChildByProps, pickChildrenFirst } from '../utils/collections'

interface Props {
  disabled?: boolean
  size?: NormalSizes
  initialValue?: string
  placeholder?: React.ReactNode | string
  icon?: React.ReactNode
  onChange?: (value: string) => void
  pure?: boolean
  className?: string
}

const defaultProps = {
  disabled: false,
  size: 'medium' as NormalSizes,
  icon: SelectIcon,
  pure: false,
  className: '',
}

export type SelectProps = Props & typeof defaultProps & React.HTMLAttributes<any>

const getDropdown = (
  ref: MutableRefObject<HTMLDivElement | null>,
  children: React.ReactNode | null,
  theme: ZeitUIThemes,
  visible: boolean,
) => (
  <Dropdown parent={ref} visible={visible}>
    <div className="select-dropdown">
      {children}
      <style jsx>{`
        .select-dropdown {
          border-radius: ${theme.layout.radius};
          box-shadow: ${theme.expressiveness.shadowLarge};
        }
      `}</style>
    </div>
  </Dropdown>
)

const Select: React.FC<React.PropsWithChildren<SelectProps>> = ({
  children, size, disabled, initialValue: init, placeholder,
  icon: Icon, onChange, className, pure, ...props
}) => {
  const theme = useTheme()
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState<boolean>(false)
  const [value, setValue] = useState<string | undefined>(init)
  const sizes = useMemo(() => getSizes(theme, size), [theme, size])
  
  const updateVisible = (next: boolean) => setVisible(next)
  const updateValue = (next: string) => {
    setValue(next)
    onChange && onChange(next)
    setVisible(false)
  }

  const initialValue: SelectConfig = useMemo(() => ({
    value, visible, updateValue, updateVisible,
    size, disableAll: disabled,
  }), [visible, size, disabled])
  
  const clickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
    event.nativeEvent.stopImmediatePropagation()
    event.preventDefault()
    if (disabled) return
    setVisible(!visible)
  }
  
  useEffect(() => {
    const closeHandler = () => setVisible(false)
    document.addEventListener('click', closeHandler)
    return () => document.removeEventListener('click', closeHandler)
  }, [])
  
  const selectedChild = useMemo(() => {
    const [, optionChildren] = pickChildByProps(children, 'value', value)
    const child = pickChildrenFirst(optionChildren)
    if (!React.isValidElement(child)) return optionChildren
    return React.cloneElement(child, { preventAllEvents: true })
  }, [value, children])

  return (
    <SelectContext.Provider value={initialValue}>
      <div className={`select ${className}`} ref={ref} onClick={clickHandler} {...props}>
        {!value && <span className="value placeholder">{placeholder}</span>}
        {value && <span className="value">{selectedChild}</span>}
        {getDropdown(ref, children, theme, visible)}
        {!pure && <div className="icon"><Icon /></div>}
        <style jsx>{`
          .select {
            display: inline-flex;
            align-items: center;
            user-select: none;
            white-space: nowrap;
            position: relative;
            cursor: ${disabled ? 'not-allowed' : 'pointer'};
            max-width: 80vw;
            width: initial;
            overflow: hidden;
            transition: border 0.2s ease 0s, color 0.2s ease-out 0s, box-shadow 0.2s ease 0s;
            border: 1px solid ${theme.palette.border};
            border-radius: ${theme.layout.radius};
            padding: 0 ${theme.layout.gapQuarter} 0 ${theme.layout.gapHalf};
            height: ${sizes.height};
            min-width: ${sizes.minWidth};
            background-color: ${disabled ? theme.palette.accents_1 : theme.palette.background};
          }
          
          .select:hover {
            border-color: ${disabled ? theme.palette.border : theme.palette.foreground};
          }
          
          .select:hover .icon {
            color: ${disabled ? theme.palette.accents_5 : theme.palette.foreground}
          }
          
          .value {
            display: inline-flex;
            flex: 1;
            height: 100%;
            align-items: center;
            line-height: 1;
            padding: 0;
            margin-right: 1.25rem;
            font-size: ${sizes.fontSize};
            color: ${disabled ? theme.palette.accents_4 : theme.palette.foreground};
            width: calc(100% - 1.25rem);
          }
          
          .value > :global(div), .value > :global(div:hover) {
            border-radius: 0;
            background-color: transparent;
            padding: 0;
            margin: 0;
            color: inherit;
          }
          
          .placeholder {
            color: ${theme.palette.accents_3};
          }
          
          .icon {
            position: absolute;
            right: ${theme.layout.gapQuarter};
            font-size: ${sizes.fontSize};
            top: 50%;
            bottom: 0;
            transform: translateY(-50%) rotate(${visible ? '180' : '0'}deg);
            pointer-events: none;
            transition: transform 200ms ease;
            display: flex;
            align-items: center;
            color: ${theme.palette.accents_5};
          }
        `}</style>
      </div>
    </SelectContext.Provider>
  )
}

type SelectComponent<P = {}> = React.FC<P> & {
  Option: typeof SelectOption
}

type ComponentProps = Partial<typeof defaultProps> & Omit<Props, keyof typeof defaultProps>

(Select as SelectComponent<ComponentProps>).defaultProps = defaultProps

export default Select as SelectComponent<ComponentProps>
