import React, { MouseEvent, useCallback, useMemo, useRef, useState } from 'react'
import useTheme from '../styles/use-theme'
import useClickAway from '../utils/use-click-away'
import { getColor } from './styles'
import ButtonDropdownIcon from './icon'
import ButtonDropdownItem from './button-dropdown-item'
import { ButtonDropdownContext } from './button-dropdown-context'
import { NormalSizes, NormalTypes } from '../utils/prop-types'
import { pickChild, pickChildByProps } from '../utils/collections'
import { getButtonSize } from '../button/styles'

interface Props {
  type?: NormalTypes
  size?: NormalSizes
  auto?: boolean
  loading?: boolean
  disabled?: boolean
  className?: string
}

const defaultProps = {
  type: 'default' as NormalTypes,
  size: 'medium' as NormalSizes,
  auto: false,
  loading: false,
  disabled: false,
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type ButtonDropdownProps = Props & typeof defaultProps & NativeAttrs

const stopPropagation = (event: MouseEvent<HTMLElement>) => {
  event.stopPropagation()
  event.nativeEvent.stopImmediatePropagation()
}

const ButtonDropdown: React.FC<React.PropsWithChildren<ButtonDropdownProps>> = ({
  children,
  type,
  size,
  auto,
  className,
  disabled,
  loading,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const theme = useTheme()
  const colors = getColor(theme.palette, type)
  const sizes = getButtonSize(size, auto)
  const itemChildren = pickChild(children, ButtonDropdownItem)[1]
  const [itemChildrenWithoutMain, mainItemChildren] = pickChildByProps(itemChildren, 'main', true)

  const [visible, setVisible] = useState<boolean>(false)
  const clickHandler = useCallback(
    (event: MouseEvent<HTMLDetailsElement>) => {
      event.preventDefault()
      stopPropagation(event)
      if (disabled || loading) return
      setVisible(!visible)
    },
    [visible],
  )

  const initialValue = useMemo(
    () => ({
      type,
      size,
      auto,
      disabled,
      loading,
    }),
    [type, size],
  )
  const bgColor = useMemo(() => {
    if (disabled || loading) return theme.palette.accents_1
    return visible ? colors.hoverBgColor : colors.bgColor
  }, [visible, colors, theme.palette])

  useClickAway(ref, () => setVisible(false))

  return (
    <ButtonDropdownContext.Provider value={initialValue}>
      <div ref={ref} className={`btn-dropdown ${className}`} onClick={stopPropagation} {...props}>
        {mainItemChildren}
        <details open={visible}>
          <summary onClick={clickHandler}>
            <ButtonDropdownIcon color={colors.color} height={sizes.height} />
          </summary>
          <div className="content">{itemChildrenWithoutMain}</div>
        </details>
        <style jsx>{`
          .btn-dropdown {
            display: inline-flex;
            position: relative;
            box-sizing: border-box;
            border: 1px solid ${theme.palette.border};
            border-radius: ${theme.layout.radius};
          }

          .btn-dropdown > :global(button) {
            border-top-left-radius: ${theme.layout.radius};
            border-bottom-left-radius: ${theme.layout.radius};
          }

          summary {
            box-sizing: border-box;
            -webkit-tap-highlight-color: transparent;
            list-style: none;
            outline: none;
            color: ${colors.color};
            background-color: ${bgColor};
            height: ${sizes.height};
            border-left: 1px solid ${colors.borderLeftColor};
            border-top-right-radius: ${theme.layout.radius};
            border-bottom-right-radius: ${theme.layout.radius};
            cursor: ${disabled || loading ? 'not-allowed' : 'pointer'};
            display: flex;
            justify-content: center;
            align-items: center;
            width: auto;
            padding: 0 1px;
            transition: background 0.2s ease 0s, border-color 0.2s ease 0s;
          }

          summary:hover {
            border-color: ${colors.hoverBorder};
            background-color: ${colors.hoverBgColor};
          }

          .content {
            position: absolute;
            right: 0;
            left: 0;
            z-index: 90;
            width: 100%;
            border-radius: ${theme.layout.radius};
            box-shadow: ${theme.expressiveness.shadowLarge};
            transform: translateY(${theme.layout.gapHalf});
            background-color: ${theme.palette.background};
          }

          .content > :global(button:first-of-type) {
            border-top-left-radius: ${theme.layout.radius};
            border-top-right-radius: ${theme.layout.radius};
          }

          .content > :global(button:last-of-type) {
            border-bottom-left-radius: ${theme.layout.radius};
            border-bottom-right-radius: ${theme.layout.radius};
          }
        `}</style>
      </div>
    </ButtonDropdownContext.Provider>
  )
}

type MemoButtonDropdownComponent<P = {}> = React.NamedExoticComponent<P> & {
  Item: typeof ButtonDropdownItem
}
type ComponentProps = Partial<typeof defaultProps> &
  Omit<Props, keyof typeof defaultProps> &
  NativeAttrs

ButtonDropdown.defaultProps = defaultProps

export default React.memo(ButtonDropdown) as MemoButtonDropdownComponent<ComponentProps>
