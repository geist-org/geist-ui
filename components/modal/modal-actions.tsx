import React, { useEffect, useRef, useState } from 'react'
import useTheme from '../use-theme'

const ModalActionsComponent: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
  ...props
}) => {
  const theme = useTheme()
  const ref = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number | string>('auto')

  useEffect(() => {
    if (!ref.current) return
    setHeight(`${ref.current.clientHeight}px`)
  }, [ref])

  return (
    <>
      <div />
      <footer ref={ref} {...props}>
        {children}
      </footer>
      <style jsx>{`
        footer {
          display: flex;
          overflow: hidden;
          width: 100%;
          height: auto;
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          border-top: 1px solid ${theme.palette.border};
          border-bottom-left-radius: ${theme.layout.radius};
          border-bottom-right-radius: ${theme.layout.radius};
        }

        footer > :global(button.btn + button.btn) {
          border-left: 1px solid ${theme.palette.border};
        }

        div {
          height: ${height};
          flex-shrink: 0;
        }
      `}</style>
    </>
  )
}

ModalActionsComponent.displayName = 'GeistModalActions'
const ModalActions = React.memo(ModalActionsComponent)
export default ModalActions
