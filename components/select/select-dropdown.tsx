import React from 'react'
import useTheme from '../styles/use-theme'
import { useSelectContext } from './select-context'
import Dropdown from '../shared/dropdown'

interface Props {
  visible: boolean
}

const SelectDropdown: React.FC<React.PropsWithChildren<Props>> = ({
  visible, children,
}) => {
  const theme = useTheme()
  const { ref } = useSelectContext()

  return (
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
}

export default SelectDropdown
