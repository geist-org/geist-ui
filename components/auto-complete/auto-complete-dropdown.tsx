import React, { CSSProperties } from 'react'
import useTheme from '../use-theme'
import withDefaults from '../utils/with-defaults'
import { useAutoCompleteContext } from './auto-complete-context'
import Dropdown from '../shared/dropdown'

interface Props {
  visible: boolean
  className?: string
  disableMatchWidth?: boolean
  dropdownStyle?: CSSProperties
}

const defaultProps = {
  className: '',
  dropdownStyle: {},
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type AutoCompleteDropdownProps = Props & typeof defaultProps & NativeAttrs

const AutoCompleteDropdown: React.FC<
  React.PropsWithChildren<AutoCompleteDropdownProps>
> = ({ children, visible, className, dropdownStyle, disableMatchWidth }) => {
  const theme = useTheme()
  const { ref } = useAutoCompleteContext()
  const clickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    event.nativeEvent.stopImmediatePropagation()
  }

  return (
    <Dropdown parent={ref} visible={visible} disableMatchWidth={disableMatchWidth}>
      <div
        className={`auto-complete-dropdown ${className}`}
        style={dropdownStyle}
        onClick={clickHandler}>
        {children}
        <style jsx>{`
          .auto-complete-dropdown {
            border-radius: ${theme.layout.radius};
            box-shadow: ${theme.expressiveness.shadowLarge};
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

export default withDefaults(AutoCompleteDropdown, defaultProps)
