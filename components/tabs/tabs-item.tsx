import React, { useEffect, useMemo } from 'react'
import { TabsInternalCellProps, useTabsContext } from './tabs-context'
import useTheme from '../use-theme'
import useScaleable, { withScaleable } from '../use-scaleable'

interface Props {
  label: string | React.ReactNode
  value: string
  disabled?: boolean
}

const defaultProps = {
  disabled: false,
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type TabsItemProps = Props & NativeAttrs

const TabsItemComponent: React.FC<React.PropsWithChildren<TabsItemProps>> = ({
  children,
  value,
  label,
  disabled,
}: React.PropsWithChildren<TabsItemProps> & typeof defaultProps) => {
  const theme = useTheme()
  const { SCALES } = useScaleable()
  const { register, currentValue } = useTabsContext()
  const isActive = useMemo(() => currentValue === value, [currentValue, value])

  const TabsInternalCell: React.FC<TabsInternalCellProps> = ({
    value: currentValue,
    onClick,
  }) => {
    const clickHandler = () => {
      if (disabled) return
      onClick && onClick(value)
    }
    return (
      <div
        className={`tab ${value === currentValue ? 'active' : ''} ${
          disabled ? 'disabled' : ''
        }`}
        role="button"
        key={value}
        onClick={clickHandler}>
        {label}
        <style jsx>{`
          .tab {
            box-sizing: border-box;
            cursor: pointer;
            outline: 0;
            transition: all 200ms ease;
            text-transform: capitalize;
            white-space: nowrap;
            color: ${theme.palette.accents_6};
            user-select: none;
            display: flex;
            align-items: center;
            position: relative;
            font-size: ${SCALES.font(1)};
            line-height: 1.25em;
            width: ${SCALES.width(1, 'auto')};
            height: ${SCALES.height(1, 'auto')};
            padding: ${SCALES.pt(0.334)} ${SCALES.pr(0.218)} ${SCALES.pb(0.334)}
              ${SCALES.pl(0.218)};
            margin: ${SCALES.mt(0)} ${SCALES.mr(0.5334)} ${SCALES.mb(0)}
              ${SCALES.ml(0.5334)};
          }

          .tab:after {
            position: absolute;
            content: '';
            bottom: -1px;
            left: 0;
            right: 0;
            width: 100%;
            height: 2px;
            border-radius: 4px;
            transform: scaleX(0.75);
            background-color: transparent;
            transition: all 200ms ease;
          }

          .tab.active:after {
            background-color: ${theme.palette.foreground};
            transform: scaleX(1);
          }

          .tab :global(svg) {
            max-height: 1em;
            margin-right: 5px;
          }

          .tab:first-of-type {
            margin-left: 0;
          }

          .tab.active {
            color: ${theme.palette.foreground};
          }

          .tab.disabled {
            color: ${theme.palette.accents_3};
            cursor: not-allowed;
          }
        `}</style>
      </div>
    )
  }
  TabsInternalCell.displayName = 'GiestTabsInternalCell'

  useEffect(() => {
    register && register({ value, cell: TabsInternalCell })
  }, [value, label, disabled, TabsInternalCell])

  /* eslint-disable react/jsx-no-useless-fragment */
  return isActive ? <>{children}</> : null
}

TabsItemComponent.defaultProps = defaultProps
TabsItemComponent.displayName = 'GeistTabsItem'
const TabsItem = withScaleable(TabsItemComponent)
export default TabsItem
/* eslint-enable */
