import React from 'react'
import useTheme from '../styles/use-theme'
import withDefaults from '../utils/with-defaults'
import { useSelectContext } from './select-context'
import Dropdown from '../shared/dropdown'

interface Props {
  visible: boolean
  className?: string
  dropdownStyle?: object
  disableMatchWidth?: boolean
}

const defaultProps = {
  className: '',
  dropdownStyle: {},
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type SelectDropdownProps = Props & typeof defaultProps & NativeAttrs

const SelectDropdown: React.FC<React.PropsWithChildren<SelectDropdownProps>> = ({
  visible,
  children,
  className,
  dropdownStyle,
  disableMatchWidth,
}) => {
  const theme = useTheme()
  const { ref } = useSelectContext()

  return (
    <Dropdown parent={ref} visible={visible} disableMatchWidth={disableMatchWidth}>
      <div className={`select-dropdown ${className}`} style={dropdownStyle}>
        {children}
        <style jsx>{`
          .select-dropdown {
            border-radius: ${theme.expressiveness.R2};
            box-shadow: ${theme.expressiveness.D2};
            background-color: ${theme.palette.cNeutral8};
            max-height: 15rem;
            overflow-y: auto;
            overflow-anchor: none;
            padding: ${theme.layout.gapHalf} 0;
          }
        `}</style>
      </div>
    </Dropdown>
  )
}

export default withDefaults(SelectDropdown, defaultProps)
