import React, { CSSProperties } from 'react'
import useTheme from '../use-theme'
import { useSelectContext } from './select-context'
import Dropdown from '../shared/dropdown'

interface Props {
  visible: boolean
  className?: string
  dropdownStyle?: CSSProperties
  disableMatchWidth?: boolean
  getPopupContainer?: () => HTMLElement | null
}

const defaultProps = {
  className: '',
  dropdownStyle: {},
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type SelectDropdownProps = Props & NativeAttrs

const SelectDropdown: React.FC<React.PropsWithChildren<SelectDropdownProps>> = ({
  visible,
  children,
  className,
  dropdownStyle,
  disableMatchWidth,
  getPopupContainer,
}: React.PropsWithChildren<SelectDropdownProps> & typeof defaultProps) => {
  const theme = useTheme()
  const { ref } = useSelectContext()

  return (
    <Dropdown
      parent={ref}
      visible={visible}
      disableMatchWidth={disableMatchWidth}
      getPopupContainer={getPopupContainer}>
      <div className={`select-dropdown ${className}`} style={dropdownStyle}>
        {children}
        <style jsx>{`
          .select-dropdown {
            border-radius: ${theme.layout.radius};
            box-shadow: ${theme.expressiveness.shadowLarge};
            background-color: ${theme.palette.background};
            max-height: 17em;
            overflow-y: auto;
            overflow-anchor: none;
            padding: 0.38em 0;
          }
        `}</style>
      </div>
    </Dropdown>
  )
}

SelectDropdown.defaultProps = defaultProps
SelectDropdown.displayName = 'GeistSelectDropdown'
export default SelectDropdown
