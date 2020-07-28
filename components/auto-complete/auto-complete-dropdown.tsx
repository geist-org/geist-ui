import React, { useMemo } from 'react'
import useTheme from '../styles/use-theme'
import withDefaults from '../utils/with-defaults'
import { useAutoCompleteContext } from './auto-complete-context'
import Dropdown from '../shared/dropdown'
import { getColors } from '../input/styles'

interface Props {
  solid?: boolean
  visible: boolean
  className?: string
  disableMatchWidth?: boolean
  dropdownStyle?: object
}

const defaultProps = {
  solid: false,
  className: '',
  dropdownStyle: {},
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type AutoCompleteDropdownProps = Props & typeof defaultProps & NativeAttrs

const AutoCompleteDropdown: React.FC<React.PropsWithChildren<AutoCompleteDropdownProps>> = ({
  children,
  solid,
  visible,
  className,
  dropdownStyle,
  disableMatchWidth,
}) => {
  const theme = useTheme()
  const { ref } = useAutoCompleteContext()
  const { border, hoverBorderColor, hoverBackgroundColor } = useMemo(
    () => getColors(theme.palette, 'default', solid),
    [theme.palette, status, solid],
  )

  const clickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    event.nativeEvent.stopImmediatePropagation()
  }

  return (
    <Dropdown parent={ref} visible={visible} disableMatchWidth={disableMatchWidth}>
      <div
        className={`auto-complete-dropdown ${className} ${solid ? 'solid' : 'lined'}`}
        style={dropdownStyle}
        onClick={clickHandler}>
        <div className="divider"></div>
        {children}
        <style jsx>{`
          .auto-complete-dropdown {
            margin-top: -3px;
            border-radius: ${theme.expressiveness.R2};
            border-top-left-radius: 0;
            border-top-right-radius: 0;
            background-color: ${hoverBackgroundColor};
            border: ${border};
            border-top: 0;
            border-color: ${hoverBorderColor};
            overflow-y: auto;
            max-height: 15rem;
            overflow-anchor: none;
          }
          .auto-complete-dropdown .divider {
            height: 1px;
            margin: auto;
            margin-right: ${theme.layout.gapHalf};
            margin-left: ${theme.layout.gapHalf};
            border-bottom: 1px dashed ${hoverBorderColor};
            z-index: 1110;
          }
        `}</style>
      </div>
    </Dropdown>
  )
}

export default withDefaults(AutoCompleteDropdown, defaultProps)
