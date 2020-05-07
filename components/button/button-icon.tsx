import React from 'react'
import withDefaults from '../utils/with-defaults'

interface Props {
  isRight?: boolean
  className?: string
}

const defaultProps = {
  isRight: false,
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type ButtonIconProps = Props & typeof defaultProps & NativeAttrs

const ButtonIcon: React.FC<React.PropsWithChildren<ButtonIconProps>> = ({
  isRight,
  children,
  className,
  ...props
}) => {
  return (
    <span className={`icon ${isRight ? 'right' : ''} ${className}`} {...props}>
      {children}
      <style jsx>{`
        .icon {
          position: absolute;
          left: var(--zeit-ui-button-padding);
          right: auto;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          justify-content: center;
          align-items: center;
          color: var(--zeit-ui-button-color);
          z-index: 1;
        }

        .right {
          right: var(--zeit-ui-button-padding);
          left: auto;
        }

        .icon :global(svg) {
          background: transparent;
          height: calc(var(--zeit-ui-button-height) / 2.35);
          width: calc(var(--zeit-ui-button-height) / 2.35);
        }
      `}</style>
    </span>
  )
}

const MemoButtonIcon = React.memo(ButtonIcon)

export default withDefaults(MemoButtonIcon, defaultProps)
