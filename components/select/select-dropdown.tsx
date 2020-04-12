import React from 'react'
import useTheme from '../styles/use-theme'
import withDefaults from '../utils/with-defaults'
import { useSelectContext } from './select-context'
import Dropdown from '../shared/dropdown'

interface Props {
  visible: boolean
  className?: string
  dropdownStyle?: object
}

const defaultProps = {
  className: '',
  dropdownStyle: {},
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type SelectDropdownProps = Props & typeof defaultProps & NativeAttrs

const SelectDropdown: React.FC<React.PropsWithChildren<SelectDropdownProps>> = ({
  visible, children, className, dropdownStyle,
}) => {
  const theme = useTheme()
  const { ref } = useSelectContext()

  return (
    <Dropdown parent={ref} visible={visible}>
      <div className={`select-dropdown ${className}`} style={dropdownStyle}>
        {children}
        <style jsx>{`
        .select-dropdown {
          border-radius: ${theme.layout.radius};
          box-shadow: ${theme.expressiveness.shadowLarge};
          background-color: ${theme.palette.background};
          max-height: 15rem;
          overflow-y: auto;
          overflow-anchor: none;
          padding: ${theme.layout.gapQuarter} 0;
        }
      `}</style>
      </div>
    </Dropdown>
  )
}

export default withDefaults(SelectDropdown, defaultProps)
