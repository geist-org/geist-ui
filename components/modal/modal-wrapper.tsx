import React, { useEffect, useRef } from 'react'
import withDefaults from '../utils/with-defaults'
import useTheme from '../use-theme'
import CSSTransition from '../shared/css-transition'
import { isChildElement } from '../utils/collections'

interface Props {
  className?: string
  visible?: boolean
}

const defaultProps = {
  className: '',
  visible: false,
}

export type ModalWrapperProps = Props & typeof defaultProps

const ModalWrapper: React.FC<React.PropsWithChildren<ModalWrapperProps>> = ({
  className,
  children,
  visible,
  ...props
}) => {
  const theme = useTheme()
  const modalContent = useRef<HTMLDivElement>(null)
  const tabStart = useRef<HTMLDivElement>(null)
  const tabEnd = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!visible) return
    const activeElement = document.activeElement
    const isChild = isChildElement(modalContent.current, activeElement)
    if (isChild) return
    tabStart.current && tabStart.current.focus()
  }, [visible])

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const isTabDown = event.keyCode === 9
    if (!visible || !isTabDown) return
    const activeElement = document.activeElement
    if (event.shiftKey) {
      if (activeElement === tabStart.current) {
        tabEnd.current && tabEnd.current.focus()
      }
    } else {
      if (activeElement === tabEnd.current) {
        tabStart.current && tabStart.current.focus()
      }
    }
  }

  return (
    <CSSTransition name="wrapper" visible={visible} clearTime={300}>
      <div
        className={`wrapper ${className}`}
        role="dialog"
        tabIndex={-1}
        onKeyDown={onKeyDown}
        ref={modalContent}
        {...props}>
        <div tabIndex={0} className="hide-tab" aria-hidden="true" ref={tabStart} />
        {children}
        <div tabIndex={0} className="hide-tab" aria-hidden="true" ref={tabEnd} />
        <style jsx>{`
          .wrapper {
            max-width: 100%;
            vertical-align: middle;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            position: relative;
            box-sizing: border-box;
            background-color: ${theme.palette.background};
            color: ${theme.palette.foreground};
            border-radius: ${theme.layout.radius};
            padding: ${theme.layout.gap};
            box-shadow: ${theme.expressiveness.shadowLarge};
            opacity: 0;
            outline: none;
            transform: translate3d(0px, -30px, 0px);
            transition: opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1) 0s,
              transform 0.35s cubic-bezier(0.4, 0, 0.2, 1) 0s;
          }

          .wrapper-enter {
            opacity: 0;
            transform: translate3d(0px, -30px, 0px);
          }

          .wrapper-enter-active {
            opacity: 1;
            transform: translate3d(0px, 0px, 0px);
          }

          .wrapper-leave {
            opacity: 1;
            transform: translate3d(0px, 0px, 0px);
          }

          .wrapper-leave-active {
            opacity: 0;
            transform: translate3d(0px, -30px, 0px);
          }

          .hide-tab {
            outline: none;
            overflow: hidden;
            width: 0;
            height: 0;
            opacity: 0;
          }
        `}</style>
      </div>
    </CSSTransition>
  )
}

export default withDefaults(ModalWrapper, defaultProps)
