import React, { CSSProperties, useImperativeHandle, useRef } from 'react'
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

const SelectDropdown = React.forwardRef<
  HTMLDivElement | null,
  React.PropsWithChildren<SelectDropdownProps>
>(
  (
    {
      visible,
      children,
      className,
      dropdownStyle,
      disableMatchWidth,
      getPopupContainer,
    }: React.PropsWithChildren<SelectDropdownProps> & typeof defaultProps,
    dropdownRef,
  ) => {
    const theme = useTheme()
    const internalDropdownRef = useRef<HTMLDivElement | null>(null)
    const { ref } = useSelectContext()
    useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(
      dropdownRef,
      () => internalDropdownRef.current,
    )

    return (
      <Dropdown
        parent={ref}
        visible={visible}
        disableMatchWidth={disableMatchWidth}
        getPopupContainer={getPopupContainer}>
        <div
          ref={internalDropdownRef}
          className={`select-dropdown ${className}`}
          style={dropdownStyle}>
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
              scroll-behavior: smooth;
            }
          `}</style>
        </div>
      </Dropdown>
    )
  },
)

SelectDropdown.defaultProps = defaultProps
SelectDropdown.displayName = 'GeistSelectDropdown'
export default SelectDropdown
