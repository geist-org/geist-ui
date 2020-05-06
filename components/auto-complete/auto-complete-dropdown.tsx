import React from 'react'
import useTheme from '../styles/use-theme'
import { useAutoCompleteContext } from './auto-complete-context'
import Dropdown from '../shared/dropdown'

interface Props {
  visible: boolean
}

const AutoCompleteDropdown: React.FC<React.PropsWithChildren<Props>> = ({ children, visible }) => {
  const theme = useTheme()
  const { ref } = useAutoCompleteContext()
  const clickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    event.nativeEvent.stopImmediatePropagation()
  }

  return (
    <Dropdown parent={ref} visible={visible}>
      <div className="auto-complete-dropdown" onClick={clickHandler}>
        {children}
        <style jsx>{`
          .auto-complete-dropdown {
            border-radius: ${theme.layout.radius};
            box-shadow: ${theme.expressiveness.shadowLarge};
            background-color: ${theme.palette.background};
          }
        `}</style>
      </div>
    </Dropdown>
  )
}

export default AutoCompleteDropdown
