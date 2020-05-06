import React from 'react'
import useTheme from '../styles/use-theme'

const ModalActions: React.FC<React.PropsWithChildren<{}>> = ({ children, ...props }) => {
  const theme = useTheme()
  return (
    <>
      <div />
      <footer {...props}>{children}</footer>
      <style jsx>{`
        footer {
          display: flex;
          overflow: hidden;
          width: 100%;
          height: 3.625rem;
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          border-top: 1px solid ${theme.palette.border};
          border-bottom-left-radius: ${theme.layout.radius};
          border-bottom-right-radius: ${theme.layout.radius};
        }

        footer > :global(button + button) {
          border-left: 1px solid ${theme.palette.border};
        }

        div {
          height: 3.625rem;
        }
      `}</style>
    </>
  )
}

const MemoModalActions = React.memo(ModalActions)

export default MemoModalActions
