import React, { useEffect, useMemo, useRef } from 'react'
import useTheme from '../use-theme'
import CssTransition from '../shared/css-transition'
import { isChildElement } from '../utils/collections'
import useScaleable from '../use-scaleable'
import { DrawerPlacement, getDrawerTransform } from './helper'

interface Props {
  className?: string
  visible?: boolean
  placement: DrawerPlacement
}

const defaultProps = {
  className: '',
  visible: false,
}

export type DrawerWrapperProps = Props

const DrawerWrapper: React.FC<React.PropsWithChildren<DrawerWrapperProps>> = ({
  className,
  children,
  visible,
  placement,
  ...props
}: React.PropsWithChildren<DrawerWrapperProps> & typeof defaultProps) => {
  const theme = useTheme()
  const { SCALES } = useScaleable()
  const modalContent = useRef<HTMLDivElement>(null)
  const tabStart = useRef<HTMLDivElement>(null)
  const tabEnd = useRef<HTMLDivElement>(null)
  const transform = useMemo(() => getDrawerTransform(placement), [placement])

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
    <CssTransition name="wrapper" visible={visible} clearTime={300}>
      <div
        className={`wrapper ${placement} ${className}`}
        role="dialog"
        tabIndex={-1}
        onKeyDown={onKeyDown}
        ref={modalContent}
        {...props}>
        <div tabIndex={0} className="hide-tab start" aria-hidden="true" ref={tabStart} />
        {children}
        <div tabIndex={0} className="hide-tab end" aria-hidden="true" ref={tabEnd} />
        <style jsx>{`
          .wrapper {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            max-width: 100%;
            vertical-align: middle;
            overflow: auto;
            display: flex;
            flex-direction: column;
            box-sizing: border-box;
            background-color: ${theme.palette.background};
            color: ${theme.palette.foreground};
            border-radius: calc(3 * ${theme.layout.radius});
            box-shadow: ${theme.expressiveness.shadowLarge};
            opacity: 0;
            outline: none;
            transform: ${transform.initial};
            transition: opacity, transform 400ms cubic-bezier(0.1, 0.6, 0.1, 1);
            font-size: ${SCALES.font(1)};
            --modal-wrapper-padding-left: ${SCALES.pl(1.3125)};
            --modal-wrapper-padding-right: ${SCALES.pr(1.3125)};
            padding: ${SCALES.pt(1.3125)} var(--modal-wrapper-padding-right)
              ${SCALES.pb(1.3125)} var(--modal-wrapper-padding-left);
            margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
          }
          .top,
          .bottom {
            width: ${SCALES.width(1, '100%')};
            height: ${SCALES.height(1, 'auto')};
          }
          .left,
          .right {
            width: ${SCALES.width(1, 'auto')};
            height: ${SCALES.height(1, '100%')};
          }
          .top {
            bottom: auto;
            border-top-left-radius: 0;
            border-top-right-radius: 0;
          }
          .left {
            right: auto;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
          }
          .bottom {
            top: auto;
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
          }
          .right {
            left: auto;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          }
          .wrapper-enter {
            opacity: 0;
            transform: ${transform.hidden};
          }
          .wrapper-enter-active {
            opacity: 1;
            transform: ${transform.visible};
          }
          .wrapper-leave {
            opacity: 1;
            transform: ${transform.visible};
            transition: opacity, transform 400ms cubic-bezier(0.1, 0.2, 0.1, 1);
          }
          .wrapper-leave-active {
            opacity: 0.4;
            transform: ${transform.hidden};
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
    </CssTransition>
  )
}

DrawerWrapper.defaultProps = defaultProps
DrawerWrapper.displayName = 'GeistDrawerWrapper'
export default DrawerWrapper
