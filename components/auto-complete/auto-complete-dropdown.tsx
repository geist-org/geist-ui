import React, { CSSProperties, useMemo } from 'react'
import useTheme from '../use-theme'
import { useAutoCompleteContext } from './auto-complete-context'
import Dropdown from '../shared/dropdown'

interface Props {
  visible: boolean
  className?: string
  disableMatchWidth?: boolean
  dropdownStyle?: CSSProperties
  getPopupContainer?: () => HTMLElement | null
}

const defaultProps = {
  className: '',
  dropdownStyle: {},
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type AutoCompleteDropdownProps = Props & NativeAttrs

const AutoCompleteDropdown: React.FC<
  React.PropsWithChildren<AutoCompleteDropdownProps>
> = ({
  children,
  visible,
  className,
  dropdownStyle,
  disableMatchWidth,
  getPopupContainer,
}: React.PropsWithChildren<AutoCompleteDropdownProps> & typeof defaultProps) => {
  const theme = useTheme()
  const { ref } = useAutoCompleteContext()
  const isEmpty = useMemo(() => {
    return !visible || React.Children.count(children) === 0
  }, [children, visible])
  const clickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    event.nativeEvent.stopImmediatePropagation()
  }

  return (
    <Dropdown
      parent={ref}
      visible={visible}
      disableMatchWidth={disableMatchWidth}
      getPopupContainer={getPopupContainer}>
      <div
        className={`auto-complete-dropdown ${className}`}
        style={dropdownStyle}
        onClick={clickHandler}>
        {children}
        <style jsx>{`
          .auto-complete-dropdown {
            border-radius: ${theme.layout.radius};
            box-shadow: ${isEmpty ? 'none' : theme.expressiveness.shadowLarge};
            background-color: ${theme.palette.background};
            overflow-y: auto;
            max-height: 15rem;
            overflow-anchor: none;
          }
        `}</style>
      </div>
    </Dropdown>
  )
}

AutoCompleteDropdown.defaultProps = defaultProps
AutoCompleteDropdown.displayName = 'GeistAutoCompleteDropdown'
export default AutoCompleteDropdown
