import React from 'react'
import { X } from '@zeit-ui/react-icons'
import withDefaults from '../utils/with-defaults'
import useTheme from '../styles/use-theme'

interface Props {
  size?: number
  color?: string
  onClick?: (event: React.MouseEvent) => void
}

const defaultProps = {
  size: 14,
}

export type ModalIconProps = Props

const ModalIcon: React.FC<ModalIconProps & typeof defaultProps> = ({ size, color, onClick }) => {
  const clickHandler = (event: React.MouseEvent) => {
    onClick && onClick(event)
  }
  const theme = useTheme()
  return (
    <div className="close" onClick={clickHandler}>
      <X size={size} color={color} />
      <style jsx>{`
        .close {
          position: absolute;
          right: ${theme.layout.gap};
          top: ${theme.layout.gap};
          cursor: pointer;
        }
      `}</style>
    </div>
  )
}

const MemoModalIcon = React.memo(ModalIcon)

export default withDefaults(MemoModalIcon, defaultProps)
