import React from 'react'
import useTheme from '../styles/use-theme'

const ModalActions: React.FC<React.PropsWithChildren<{}>> = ({ children, ...props }) => {
  const theme = useTheme()
  return (
    <>
      <footer {...props}>{children}</footer>
      <style jsx>{`
        footer {
          display: flex;
          overflow: hidden;
          justify-content: space-around;
          width: 100%;
          padding: calc(${theme.layout.gapHalf} * 1.5) 0 calc(${theme.layout.gap} * 0.5);
        }
      `}</style>
    </>
  )
}

const MemoModalActions = React.memo(ModalActions)

export default MemoModalActions
