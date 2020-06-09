import React, { MouseEvent, useCallback } from 'react'
import withDefaults from '../utils/with-defaults'
import useTheme from '../styles/use-theme'
import CSSTransition from './css-transition'
import useCurrentState from '../utils/use-current-state'

interface Props {
  onClick?: (event: MouseEvent<HTMLElement>) => void
  visible?: boolean
  offsetY?: number
}

const defaultProps = {
  onClick: () => {},
  visible: false,
  offsetY: 0,
}

export type BackdropProps = Props & typeof defaultProps

const Backdrop: React.FC<React.PropsWithChildren<BackdropProps>> = React.memo(
  ({ children, onClick, visible, offsetY }) => {
    const theme = useTheme()
    const [, setIsContentMouseDown, IsContentMouseDownRef] = useCurrentState(false)
    const clickHandler = (event: MouseEvent<HTMLElement>) => {
      if (IsContentMouseDownRef.current) return
      onClick && onClick(event)
    }
    const childrenClickHandler = useCallback((event: MouseEvent<HTMLElement>) => {
      event.stopPropagation()
    }, [])
    const mouseUpHandler = () => {
      if (!IsContentMouseDownRef.current) return
      const timer = setTimeout(() => {
        setIsContentMouseDown(false)
        clearTimeout(timer)
      }, 0)
    }

    return (
      <CSSTransition visible={visible} clearTime={300}>
        <div className="backdrop" onClick={clickHandler} onMouseUp={mouseUpHandler}>
          <div className="layer" />
          <div
            onClick={childrenClickHandler}
            className="content"
            onMouseDown={() => setIsContentMouseDown(true)}>
            {children}
          </div>
          <div onClick={childrenClickHandler} className="offset" />
          <style jsx>{`
            .backdrop {
              position: fixed;
              top: 0;
              left: 0;
              display: flex;
              align-content: center;
              align-items: center;
              flex-direction: column;
              justify-content: center;
              height: 100vh;
              width: 100vw;
              overflow: auto;
              z-index: 1000;
            }

            .content {
              display: flex;
              align-items: center;
              justify-content: center;
              position: relative;
              z-index: 1001;
              outline: none;
            }

            .offset {
              height: ${offsetY}vh;
              opacity: 0;
              background-color: transparent;
            }

            .layer {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              width: 100%;
              height: 100%;
              opacity: ${theme.expressiveness.portalOpacity};
              background-color: black;
              transition: opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1);
              pointer-events: none;
              z-index: 1000;
            }
          `}</style>
        </div>
      </CSSTransition>
    )
  },
)

export default withDefaults(Backdrop, defaultProps)
