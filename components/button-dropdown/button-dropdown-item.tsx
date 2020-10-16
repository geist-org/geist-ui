import React, { MouseEvent, useMemo } from 'react'
import useTheme from '../use-theme'
import withDefaults from '../utils/with-defaults'
import { getColor } from './styles'
import { useButtonDropdown } from './button-dropdown-context'
import { getButtonSize } from '../button/styles'
import Loading from '../loading'
import { NormalTypes } from '../utils/prop-types'

interface Props {
  main?: boolean
  type?: NormalTypes
  onClick?: React.MouseEventHandler<HTMLElement>
  className?: string
}

const defaultProps = {
  main: false,
  type: 'default' as NormalTypes,
  onClick: () => {},
  className: '',
}

type NativeAttrs = Omit<React.ButtonHTMLAttributes<any>, keyof Props>
export type ButtonDropdownItemProps = Props & typeof defaultProps & NativeAttrs

const ButtonDropdownItem: React.FC<React.PropsWithChildren<ButtonDropdownItemProps>> = ({
  children,
  onClick,
  className,
  main,
  type: selfType,
  ...props
}) => {
  const theme = useTheme()
  const { size, type: parentType, auto, disabled, loading } = useButtonDropdown()
  const type = main ? parentType : selfType
  const colors = getColor(theme.palette, type, disabled)
  const sizes = getButtonSize(size, auto || false)
  const clickHandler = (event: MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return
    onClick && onClick(event)
  }

  const cursor = useMemo(() => {
    if (loading) return 'default'
    return disabled ? 'not-allowed' : 'pointer'
  }, [loading, disabled])

  return (
    <button className={className} onClick={clickHandler} {...props}>
      {loading ? <Loading /> : children}
      <style jsx>{`
        button {
          position: relative;
          -webkit-appearance: button;
          text-rendering: auto;
          display: inline-flex;
          flex: 1;
          justify-content: center;
          align-items: center;
          vertical-align: middle;
          text-align: center;
          cursor: ${cursor};
          box-sizing: border-box;
          margin: 0;
          border: none;
          background-color: ${colors.bgColor};
          color: ${colors.color};
          width: 100%;
          height: ${sizes.height};
          min-width: ${sizes.minWidth};
          padding: 0 ${sizes.padding};
          font-size: ${sizes.fontSize};
        }

        button:hover {
          border-color: ${colors.hoverBorder};
          background-color: ${colors.hoverBgColor};
        }
      `}</style>
    </button>
  )
}

const MemoButtonDropdownItem = React.memo(ButtonDropdownItem)

export default withDefaults(MemoButtonDropdownItem, defaultProps)
