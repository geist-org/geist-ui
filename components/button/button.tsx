import React, {
  useRef,
  useState,
  MouseEvent,
  useMemo,
  useImperativeHandle,
  PropsWithoutRef,
  RefAttributes,
  MouseEventHandler,
} from 'react'
import useTheme from '../styles/use-theme'
import ButtonDrip from './button.drip'
import ButtonLoading from './button-loading'
import {
  ButtonColors,
  ButtonVariants,
  TagVariants,
  NormalSizes,
  TagSizes,
  TagColors,
} from '../utils/prop-types'
import { filterPropsWithGroup, getButtonChildrenWithIcon } from './utils'
import { useButtonGroupContext } from '../button-group/button-group-context'
import {
  getButtonColors,
  getButtonCursor,
  getButtonDripColor,
  getButtonSize,
  getTagSize,
} from './styles'

interface ButtonBaseProps {
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

interface TagBaseProps {
  toggleable: boolean
  variant?: TagVariants
  color?: ButtonColors
  size?: NormalSizes
  disabled?: boolean
  icon?: React.ReactNode
  iconRight?: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLSpanElement>
  className?: string
  isTag?: boolean
  dashed: boolean
}

const defaultButtonProps = {
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
  dashed: false,
}

const defaultTagProps = {
  toggleable: false,
  isTag: true,
  variant: 'line' as TagVariants,
  color: 'default' as TagColors,
  size: 'medium' as TagSizes,
  effect: true,
  disabled: false,
  className: '',
}

type ButtonNativeAttrs = Omit<React.ButtonHTMLAttributes<any>, keyof ButtonBaseProps>
export type ButtonProps = ButtonBaseProps & typeof defaultButtonProps & ButtonNativeAttrs

type TagNativeAttrs = Omit<React.HTMLAttributes<any>, keyof TagBaseProps>
export type TagProps = TagBaseProps & typeof defaultTagProps & TagNativeAttrs

const TagOrButtonRender = <T, P>(
  { ...btnProps }: React.PropsWithChildren<T>,
  ref: React.Ref<P | null>,
) => {
  const theme = useTheme()
  const buttonRef = useRef<P>(null)
  useImperativeHandle(ref, () => buttonRef.current)

  const [active, setActive] = useState<boolean>(false)
  const [dripShow, setDripShow] = useState<boolean>(false)
  const [dripX, setDripX] = useState<number>(0)
  const [dripY, setDripY] = useState<number>(0)
  const groupConfig = useButtonGroupContext()
  const filteredProps = filterPropsWithGroup(
    (btnProps as unknown) as React.PropsWithChildren<ButtonProps>,
    groupConfig,
  )
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
    dashed,
    ...props
  } = filteredProps

  const buttonOrTagColors = useMemo(() => getButtonColors(theme.palette, filteredProps, isTag), [
    theme.palette,
    filteredProps,
  ])
  const { cursor, events } = useMemo(() => getButtonCursor(disabled, loading), [disabled, loading])
  const { height, minWidth, padding, width, fontSize } = useMemo(
    () => (isTag ? getTagSize(size as TagSizes) : getButtonSize(size, auto)),
    [size, auto, isTag],
  )
  const dripColor = useMemo(() => getButtonDripColor(theme.palette, filteredProps), [
    theme.palette,
    filteredProps,
  ])

  let colors = buttonOrTagColors.default
  let hoverColors = buttonOrTagColors.hover
  let activeColors = buttonOrTagColors.active
  if (loading) {
    colors = buttonOrTagColors.active
    hoverColors = buttonOrTagColors.active
    activeColors = buttonOrTagColors.active
  }

  /* istanbul ignore next */
  const dripCompletedHandle = () => {
    setDripShow(false)
    setDripX(0)
    setDripY(0)
  }

  const clickHandler: MouseEventHandler<P> = event => {
    if (disabled || loading) return
    if (isTag && toggleable) {
      setActive(!active)
    }

    const showDrip = !shadow && !ghost && effect
    /* istanbul ignore next */
    if (showDrip && buttonRef.current) {
      const rect = ((buttonRef.current as unknown) as HTMLButtonElement).getBoundingClientRect()
      setDripShow(true)
      setDripX(event.clientX - rect.left)
      setDripY(event.clientY - rect.top)
    }

    onClick && onClick((event as unknown) as MouseEvent<HTMLButtonElement>)
  }

  const ButtonOrTag = isTag ? 'span' : 'button'

  const childrenWithIcon = useMemo(
    () =>
      getButtonChildrenWithIcon(
        loading,
        auto,
        size,
        children,
        {
          icon,
          iconRight,
        },
        isTag,
      ),
    [loading, auto, size, children, icon, iconRight],
  )

  return (
    <ButtonOrTag
      ref={(buttonRef as unknown) as React.RefObject<HTMLButtonElement>}
      type={isTag ? undefined : htmlType}
      className={`${isTag ? 'tag' : 'btn'} ${
        isTag && toggleable && active ? 'active' : ''
      } ${className}`}
      disabled={disabled}
      // @ts-ignore https://github.com/microsoft/TypeScript/issues/28892
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
          font-weight: 500;
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
    </ButtonOrTag>
  )
}

const Button = React.forwardRef<HTMLButtonElement, React.PropsWithChildren<ButtonProps>>(
  TagOrButtonRender,
)
const TagBase = React.forwardRef<HTMLSpanElement, React.PropsWithChildren<TagProps>>(
  TagOrButtonRender,
)

type ButtonComponent<T, P = {}> = React.ForwardRefExoticComponent<
  PropsWithoutRef<P> & RefAttributes<T>
>
type ComponentProps = Partial<typeof defaultButtonProps> &
  Omit<ButtonBaseProps, keyof typeof defaultButtonProps> &
  ButtonNativeAttrs

Button.defaultProps = defaultButtonProps

type TagComponent<T, P = {}> = React.ForwardRefExoticComponent<
  PropsWithoutRef<P> & RefAttributes<T>
>

TagBase.defaultProps = defaultTagProps

export default React.memo(Button) as ButtonComponent<HTMLButtonElement, ComponentProps>
export const Tag = React.memo(TagBase) as TagComponent<HTMLSpanElement, ComponentProps>
