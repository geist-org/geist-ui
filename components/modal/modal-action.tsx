import React, { MouseEvent, useMemo } from 'react'
import withDefaults from '../utils/with-defaults'
import useTheme from '../styles/use-theme'
import { useModalContext } from './modal-context'

type ModalActionEvent = MouseEvent<HTMLButtonElement> & {
  close: () => void
}

interface Props {
  className?: string
  passive?: boolean
  disabled?: boolean
  onClick?: (event: ModalActionEvent) => void
}

const defaultProps = {
  className: '',
  passive: false,
  disabled: false,
}

type NativeAttrs = Omit<React.ButtonHTMLAttributes<any>, keyof Props>
export type ModalActionProps = Props & typeof defaultProps & NativeAttrs

const ModalAction: React.FC<ModalActionProps> = ({
  className,
  children,
  onClick,
  passive,
  disabled,
  ...props
}) => {
  const theme = useTheme()
  const { close } = useModalContext()
  const clickHandler = (event: MouseEvent<HTMLButtonElement>) => {
    if (disabled) return
    const actionEvent = Object.assign({}, event, {
      close: () => close && close(),
    })
    onClick && onClick(actionEvent)
  }

  const color = useMemo(() => {
    return passive || disabled ? theme.palette.accents_5 : theme.palette.foreground
  }, [theme.palette, passive, disabled])

  const bgColor = useMemo(() => {
    return disabled ? theme.palette.accents_1 : theme.palette.background
  }, [theme.palette, disabled])

  return (
    <>
      <button className={className} onClick={clickHandler} {...props}>
        {children}
      </button>
      <style jsx>{`
        button {
          font-size: 0.75rem;
          text-transform: uppercase;
          display: flex;
          -webkit-box-align: center;
          align-items: center;
          -webkit-box-pack: center;
          justify-content: center;
          outline: none;
          text-decoration: none;
          transition: all 200ms ease-in-out 0s;
          border: none;
          color: ${color};
          background-color: ${bgColor};
          cursor: ${disabled ? 'not-allowed' : 'pointer'};
          flex: 1;
        }

        button:hover {
          color: ${disabled ? color : theme.palette.foreground};
          background-color: ${disabled ? bgColor : theme.palette.accents_1};
        }
      `}</style>
    </>
  )
}

export default withDefaults(ModalAction, defaultProps)
