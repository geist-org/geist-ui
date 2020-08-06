import React, {
  useRef,
  useState,
  MouseEvent,
  useMemo,
  useImperativeHandle,
  PropsWithoutRef,
  RefAttributes,
} from 'react'
import useTheme from '../styles/use-theme'
import ButtonDrip from './button.drip'
import ButtonLoading from './button-loading'
import { ButtonColors, ButtonVariants, NormalSizes } from '../utils/prop-types'
import { filterPropsWithGroup, getButtonChildrenWithIcon } from './utils'
import { useButtonGroupContext } from '../button-group/button-group-context'
import { getButtonColors, getButtonCursor, getButtonDripColor, getButtonSize } from './styles'

interface Props {
  toggleable: boolean
  variant?: ButtonVariants
  color?: ButtonColors
  size?: NormalSizes
  ghost?: boolean
  loading?: boolean
  shadow?: boolean
  auto?: boolean
  effect?: boolean
  disabled?: boolean
  htmlType?: React.ButtonHTMLAttributes<any>['type']
  icon?: React.ReactNode
  iconRight?: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  className?: string
  isTag?: boolean
}

const defaultProps = {
  toggleable: false,
  isTag: false,
  variant: 'line' as ButtonVariants,
  color: 'default' as ButtonColors,
  size: 'medium' as NormalSizes,
  htmlType: 'button' as React.ButtonHTMLAttributes<any>['type'],
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

const TagRender = (
  { ...btnProps }: React.PropsWithChildren<ButtonProps>,
  ref: React.Ref<HTMLButtonElement | null>,
) => {
  const theme = useTheme()
  const buttonRef = useRef<HTMLButtonElement>(null)
  useImperativeHandle(ref, () => buttonRef.current)

  const [active, setActive] = useState<boolean>(false)
  const [dripShow, setDripShow] = useState<boolean>(false)
  const [dripX, setDripX] = useState<number>(0)
  const [dripY, setDripY] = useState<number>(0)
  const groupConfig = useButtonGroupContext()
  const filteredProps = filterPropsWithGroup(btnProps, groupConfig)
  const {
    toggleable,
    children,
    disabled,
    variant,
    color,
    loading,
    shadow,
    ghost,
    effect,
    onClick,
    auto,
    size,
    icon,
    htmlType,
    iconRight,
    className,
    isTag,
    ...props
  } = filteredProps

  const buttonColors = useMemo(() => getButtonColors(theme.palette, filteredProps), [
    theme.palette,
    filteredProps,
  ])
  const { cursor, events } = useMemo(() => getButtonCursor(disabled, loading), [disabled, loading])
  const { height, minWidth, padding, width, fontSize } = useMemo(() => getButtonSize(size, auto), [
    size,
    auto,
  ])
  const dripColor = useMemo(() => getButtonDripColor(theme.palette, filteredProps), [
    theme.palette,
    filteredProps,
  ])

  let colors = buttonColors.default
  let hoverColors = buttonColors.hover
  let activeColors = buttonColors.active
  if (loading) {
    colors = buttonColors.active
    hoverColors = buttonColors.active
    activeColors = buttonColors.active
  }

  /* istanbul ignore next */
  const dripCompletedHandle = () => {
    setDripShow(false)
    setDripX(0)
    setDripY(0)
  }

  const clickHandler = (event: MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return
    if (isTag && toggleable) {
      setActive(!active)
    }
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

  const Tag = isTag ? 'span' : 'button'

  const childrenWithIcon = useMemo(
    () =>
      getButtonChildrenWithIcon(loading, auto, size, children, {
        icon,
        iconRight,
      }),
    [loading, auto, size, children, icon, iconRight],
  )

  return (
    <Tag
      ref={buttonRef}
      type={isTag ? undefined : htmlType}
      className={`${isTag ? 'tag' : 'btn'} ${
        isTag && toggleable && active ? 'active' : ''
      } ${className}`}
      disabled={disabled}
      onClick={clickHandler}
      {...props}>
      {loading && <ButtonLoading color={colors.color} />}
      {childrenWithIcon}
      {dripShow && (
        <ButtonDrip x={dripX} y={dripY} color={dripColor} onCompleted={dripCompletedHandle} />
      )}
      <style jsx>{`
        .tag,
        .btn {
          box-sizing: border-box;
          display: inline-block;
          padding: 0 ${padding};
          height: ${height};
          line-height: ${height};
          min-width: ${minWidth};
          width: ${width};
          border-radius: ${theme.expressiveness.R1};
          font-weight: bold;
          font-size: ${fontSize};
          user-select: none;
          outline: none;
          text-transform: capitalize;
          justify-content: center;
          text-align: center;
          white-space: nowrap;
          transition: background-color 200ms ease 0ms, box-shadow 200ms ease 0ms,
            border 200ms ease 0ms, color 200ms ease 0ms;
          position: relative;
          overflow: hidden;
          color: ${colors.color};
          background-color: ${colors.bg};
          border: ${theme.expressiveness.L2} ${theme.expressiveness.cLineStyle1} ${colors.border};
          cursor: ${cursor};
          pointer-events: ${events};
          box-shadow: ${shadow ? theme.expressiveness.shadowSmall : 'none'};
          --zeit-ui-button-padding: ${padding};
          --zeit-ui-button-height: ${height};
          --zeit-ui-button-color: ${colors.color};
          --zeit-ui-button-bg: ${colors.bg};
        }

        .tag {
          min-width: 5rem;
          font-size: 0.8571rem;
          font-weight: 500;
          height: 2.1429rem;
          line-height: 2.1429rem;
        }

        .tag:hover,
        .btn:hover {
          color: ${hoverColors.color};
          --zeit-ui-button-color: ${hoverColors.color};
          background-color: ${hoverColors.bg};
          border-color: ${hoverColors.border};
          cursor: ${cursor};
          pointer-events: ${events};
          box-shadow: ${shadow ? theme.expressiveness.shadowMedium : 'none'};
          transform: translate3d(0px, ${shadow ? '-1px' : '0px'}, 0px);
        }

        .tag.active,
        .tag:active,
        .btn:active {
          color: ${activeColors.color};
          --zeit-ui-button-color: ${activeColors.color};
          background-color: ${activeColors.bg};
          border-color: ${activeColors.border};
          cursor: ${cursor};
          pointer-events: ${events};
          box-shadow: ${shadow ? theme.expressiveness.shadowMedium : 'none'};
          transform: translate3d(0px, ${shadow ? '-1px' : '0px'}, 0px);
        }

        .tag :global(.text),
        .btn :global(.text) {
          position: relative;
          z-index: 1;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          line-height: inherit;
          top: -2px;
        }

        .tag :global(.text p),
        .tag :global(.text pre),
        .tag :global(.text div),
        .btn :global(.text p),
        .btn :global(.text pre),
        .btn :global(.text div) {
          margin: 0;
        }
        .tag :global(.hidden),
        .btn :global(.hidden) {
          visibility: hidden;
        }
      `}</style>
    </Tag>
  )
}

const Button = React.forwardRef<HTMLButtonElement, React.PropsWithChildren<ButtonProps>>(TagRender)
const TagBase = React.forwardRef<HTMLButtonElement, React.PropsWithChildren<ButtonProps>>(TagRender)

type ButtonComponent<T, P = {}> = React.ForwardRefExoticComponent<
  PropsWithoutRef<P> & RefAttributes<T>
>
type ComponentProps = Partial<typeof defaultProps> &
  Omit<Props, keyof typeof defaultProps> &
  NativeAttrs

Button.defaultProps = defaultProps

type TagComponent<T, P = {}> = React.ForwardRefExoticComponent<
  PropsWithoutRef<P> & RefAttributes<T>
>

TagBase.defaultProps = Object.assign({}, defaultProps)
TagBase.defaultProps.isTag = true

export default React.memo(Button) as ButtonComponent<HTMLButtonElement, ComponentProps>
export const Tag = React.memo(TagBase) as TagComponent<HTMLSpanElement, ComponentProps>
