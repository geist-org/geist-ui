import React from 'react'
import withDefaults from '../utils/with-defaults'
import useTheme from '../styles/use-theme'
import CSSTransition from '../shared/css-transition'

interface Props {
  className?: string
  width?: string
  visible?: boolean
}

const defaultProps = {
  className: '',
  width: '26rem',
  visible: false,
}

export type ModalWrapperProps = Props & typeof defaultProps

const ModalWrapper: React.FC<React.PropsWithChildren<ModalWrapperProps>> = ({
  className, width, children, visible, ...props
}) => {
  const theme = useTheme()

  return (
    <CSSTransition name="wrapper" visible={visible} clearTime={300}>
      <div className={`wrapper ${className}`} {...props}>
        {children}
        <style jsx>{`
        .wrapper {
          max-width: 85vw;
          width: ${width};
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
          transform: translate3d(0px, -40px, 0px);
          transition: opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1) 0s, transform 0.35s cubic-bezier(0.4, 0, 0.2, 1) 0s;
        }
        
        .wrapper-enter {
          opacity: 0;
          transform: translate3d(0px, -40px, 0px);
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
          transform: translate3d(0px, -50px, 0px);
        }
      `}</style>
      </div>
    </CSSTransition>
  )
}

export default withDefaults(ModalWrapper, defaultProps)
