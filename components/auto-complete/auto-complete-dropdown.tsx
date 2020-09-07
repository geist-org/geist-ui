import React, { useMemo } from 'react'
import useTheme from '../styles/use-theme'
import withDefaults from '../utils/with-defaults'
import { useAutoCompleteContext } from './auto-complete-context'
import Dropdown from '../shared/dropdown'
import { getColors } from '../input/styles'

interface Props {
  variant?: string
  visible: boolean
  className?: string
  disableMatchWidth?: boolean
  dropdownStyle?: object
}

const defaultProps = {
  variant: 'line',
  className: '',
  dropdownStyle: {},
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type AutoCompleteDropdownProps = Props & typeof defaultProps & NativeAttrs

const AutoCompleteDropdown: React.FC<React.PropsWithChildren<AutoCompleteDropdownProps>> = ({
  children,
  variant,
  visible,
  className,
  dropdownStyle,
  disableMatchWidth,
}) => {
  const isSolid = variant === 'solid'
  const theme = useTheme()
  const { ref, value } = useAutoCompleteContext()
  const { border, hoverBorderColor, hoverBackgroundColor } = useMemo(
    () => getColors(theme, 'default', isSolid),
    [theme, status, isSolid],
  )

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
      clearTime={value === '' ? 0 : 60}
      leaveTime={value === '' ? 0 : 60}>
      <div
        className={`auto-complete-dropdown ${isSolid ? 'solid' : 'line'} ${className}`}
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
            margin-bottom: calc(${theme.layout.gapHalf} * 0.375);
            z-index: 1110;
          }

          .solid.auto-complete-dropdown .divider {
            border-bottom: 1px dashed ${theme.palette.cTheme7};
          }

          .line.auto-complete-dropdown .divider {
            border-bottom: 1px dashed ${hoverBorderColor};
          }
        `}</style>
      </div>
    </Dropdown>
  )
}

export default withDefaults(AutoCompleteDropdown, defaultProps)
