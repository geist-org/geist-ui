import React, { useRef, useState, MouseEvent, useMemo } from 'react'
import useTheme from '../styles/use-theme'
import withDefaults from '../utils/with-defaults'
import ButtonDrip from './button.drip'
import ButtonLoading from '../loading'
import { ButtonTypes, NormalSizes } from '../utils/prop-types'
import { filterPropsWithGroup, getButtonChildrenWithIcon } from './utils'
import { useButtonGroupContext } from '../button-group/button-group-context'
import { getButtonColors, getButtonCursor, getButtonHoverColors, getButtonSize } from './styles'

interface Props {
  type?: ButtonTypes
  size?: NormalSizes
  ghost?: boolean
  loading?: boolean
  shadow?: boolean
  auto?: boolean
  effect?: boolean
  disabled?: boolean
  icon?: React.ReactNode
  iconRight?: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  className?: string
}

const defaultProps = {
  type: 'default' as ButtonTypes,
  size: 'medium' as NormalSizes,
  ghost: false,
  loading: false,
  shadow: false,
  auto: false,
  effect: true,
  disabled: false,
  className: '',
}

type NativeAttrs = Omit<React.ButtonHTMLAttributes<any>, keyof Props>
export type ButtonProps = Props & typeof defaultProps & NativeAttrs

const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({ ...btnProps }) => {
  const theme = useTheme()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [dripShow, setDripShow] = useState<boolean>(false)
  const [dripX, setDripX] = useState<number>(0)
  const [dripY, setDripY] = useState<number>(0)
  const groupConfig = useButtonGroupContext()
  const {
    children,
    disabled,
    type,
    loading,
    shadow,
    ghost,
    effect,
    onClick,
    auto,
    size,
    icon,
    iconRight,
    className,
    ...props
  } = filterPropsWithGroup(btnProps, groupConfig)

  const { bg, border, color } = useMemo(() => getButtonColors(theme, type, disabled, ghost), [
    theme,
    type,
    disabled,
    ghost,
  ])
  const hover = useMemo(() => getButtonHoverColors(theme, type, disabled, loading, shadow, ghost), [
    theme,
    type,
    disabled,
    loading,
    shadow,
    ghost,
  ])
  const { cursor, events } = useMemo(() => getButtonCursor(disabled, loading), [disabled, loading])
  const { height, minWidth, padding, width, fontSize } = useMemo(() => getButtonSize(size, auto), [
    size,
    auto,
  ])

  /* istanbul ignore next */
  const dripCompletedHandle = () => {
    setDripShow(false)
    setDripX(0)
    setDripY(0)
  }

  const clickHandler = (event: MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return
    const showDrip = !shadow && !ghost && effect
    /* istanbul ignore next */
    if (showDrip && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      setDripShow(true)
      setDripX(event.clientX - rect.left)
      setDripY(event.clientY - rect.top)
    }

    onClick && onClick(event)
  }

  const childrenWithIcon = useMemo(
    () =>
      getButtonChildrenWithIcon(auto, size, children, {
        icon,
        iconRight,
      }),
    [auto, size, children, icon, iconRight],
  )

  return (
    <button
      ref={buttonRef}
      type="button"
      className={`btn ${className}`}
      disabled={disabled}
      onClick={clickHandler}
      {...props}>
      {loading ? <ButtonLoading /> : childrenWithIcon}
      {dripShow && (
        <ButtonDrip
          x={dripX}
          y={dripY}
          color={theme.palette.accents_2}
          onCompleted={dripCompletedHandle}
        />
      )}
      <style jsx>{`
        .btn {
          box-sizing: border-box;
          display: inline-block;
          padding: 0 ${padding};
          height: ${height};
          line-height: ${height};
          min-width: ${minWidth};
          width: ${width};
          border-radius: ${theme.layout.radius};
          font-weight: 400;
          font-size: ${fontSize};
          user-select: none;
          outline: none;
          text-transform: capitalize;
          justify-content: center;
          text-align: center;
          white-space: nowrap;
          transition: background-color 200ms ease 0ms, box-shadow 200ms ease 0ms,
            border 200ms ease 0ms;
          position: relative;
          overflow: hidden;
          color: ${color};
          background-color: ${bg};
          border: 1px solid ${border};
          cursor: ${cursor};
          pointer-events: ${events};
          box-shadow: ${shadow ? theme.expressiveness.shadowSmall : 'none'};
          --zeit-ui-button-padding: ${padding};
          --zeit-ui-button-height: ${height};
          --zeit-ui-button-color: ${color};
        }

        .btn:hover {
          color: ${hover.color};
          --zeit-ui-button-color: ${hover.color};
          background-color: ${hover.bg};
          border-color: ${hover.border};
          cursor: ${cursor};
          pointer-events: ${events};
          box-shadow: ${shadow ? theme.expressiveness.shadowMedium : 'none'};
          transform: translate3d(0px, ${shadow ? '-1px' : '0px'}, 0px);
        }

        .btn :global(.text) {
          position: relative;
          z-index: 1;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          line-height: inherit;
          top: -1px;
        }

        .btn :global(.text p),
        .btn :global(.text pre),
        .btn :global(.text div) {
          margin: 0;
        }
      `}</style>
    </button>
  )
}

const MemoButton = React.memo<React.PropsWithChildren<ButtonProps>>(Button)

export default withDefaults(MemoButton, defaultProps)
