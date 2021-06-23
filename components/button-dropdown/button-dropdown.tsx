import React, { MouseEvent, useCallback, useMemo, useRef, useState } from 'react'
import useTheme from '../use-theme'
import useClickAway from '../utils/use-click-away'
import { getColor } from './styles'
import ButtonDropdownIcon from './icon'
import ButtonDropdownItem from './button-dropdown-item'
import { ButtonDropdownContext } from './button-dropdown-context'
import { NormalTypes } from '../utils/prop-types'
import { pickChild, pickChildByProps } from '../utils/collections'
import useScaleable, { withScaleable } from '../use-scaleable'

export type ButtonDropdownTypes = NormalTypes

interface Props {
  type?: ButtonDropdownTypes
  auto?: boolean
  loading?: boolean
  disabled?: boolean
  className?: string
}

const defaultProps = {
  type: 'default' as ButtonDropdownTypes,
  auto: false,
  loading: false,
  disabled: false,
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type ButtonDropdownProps = Props & NativeAttrs

const stopPropagation = (event: MouseEvent<HTMLElement>) => {
  event.stopPropagation()
  event.nativeEvent.stopImmediatePropagation()
}

const ButtonDropdownComponent: React.FC<React.PropsWithChildren<ButtonDropdownProps>> = ({
  children,
  type,
  auto,
  className,
  disabled,
  loading,
  ...props
}) => {
  const { SCALES } = useScaleable()
  const ref = useRef<HTMLDivElement>(null)
  const theme = useTheme()
  const colors = getColor(theme.palette, type)
  const itemChildren = pickChild(children, ButtonDropdownItem)[1]
  const [itemChildrenWithoutMain, mainItemChildren] = pickChildByProps(
    itemChildren,
    'main',
    true,
  )

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

  const initialValue = {
    type,
    auto,
    disabled,
    loading,
  }
  const bgColor = useMemo(() => {
    if (disabled || loading) return theme.palette.accents_1
    return visible ? colors.hoverBgColor : colors.bgColor
  }, [visible, colors, theme.palette])
  const [paddingLeft, paddingRight] = [
    auto ? SCALES.pl(1.15) : SCALES.pl(1.375),
    auto ? SCALES.pr(1.15) : SCALES.pr(1.375),
  ]

  useClickAway(ref, () => setVisible(false))

  return (
    <ButtonDropdownContext.Provider value={initialValue}>
      <div
        ref={ref}
        className={`btn-dropdown ${className}`}
        onClick={stopPropagation}
        {...props}>
        {mainItemChildren}
        <details open={visible}>
          <summary onClick={clickHandler}>
            <ButtonDropdownIcon color={colors.color} height={SCALES.height(2.5)} />
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
            --geist-ui-dropdown-height: ${SCALES.height(2.5)};
            --geist-ui-dropdown-min-width: ${auto ? 'min-content' : SCALES.width(12.5)};
            --geist-ui-dropdown-padding: ${SCALES.pt(0)} ${paddingRight} ${SCALES.pb(0)}
              ${paddingLeft};
            --geist-ui-dropdown-font-size: ${SCALES.font(0.875)};
          }

          .btn-dropdown > :global(button) {
            border-top-left-radius: ${theme.layout.radius};
            border-bottom-left-radius: ${theme.layout.radius};
          }

          details {
            border-top-right-radius: ${theme.layout.radius};
            border-bottom-right-radius: ${theme.layout.radius};
            overflow: hidden;
          }

          summary {
            box-sizing: border-box;
            -webkit-tap-highlight-color: transparent;
            list-style: none;
            outline: none;
            color: ${colors.color};
            background-color: ${bgColor};
            height: ${SCALES.height(2.5)};
            border-left: 1px solid ${colors.borderLeftColor};
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

ButtonDropdownComponent.displayName = 'GeistButtonDropdown'
ButtonDropdownComponent.defaultProps = defaultProps
const ButtonDropdown = withScaleable(ButtonDropdownComponent)
export default ButtonDropdown
