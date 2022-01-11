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
  const { register, currentValue, leftSpace } = useTabsContext()
  const isActive = useMemo(() => currentValue === value, [currentValue, value])

  const TabsInternalCell: React.FC<TabsInternalCellProps> = ({ onClick }) => {
    const { currentValue } = useTabsContext()
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
            position: relative;
            box-sizing: border-box;
            cursor: pointer;
            outline: 0;
            transition: all 200ms ease;
            text-transform: capitalize;
            white-space: nowrap;
            background-color: transparent;
            color: ${theme.palette.accents_5};
            user-select: none;
            display: flex;
            align-items: center;
            font-size: ${SCALES.font(0.875)};
            line-height: normal;
            width: ${SCALES.width(1, 'auto')};
            height: ${SCALES.height(1, 'auto')};
            padding: ${SCALES.pt(0.875)} ${SCALES.pr(0.55)} ${SCALES.pb(0.875)}
              ${SCALES.pl(0.55)};
            margin: ${SCALES.mt(0)} ${SCALES.mr(0.2)} ${SCALES.mb(0)} ${SCALES.ml(0.2)};
            z-index: 1;
            --tabs-item-hover-left: calc(-1 * ${SCALES.pl(0.28)});
            --tabs-item-hover-right: calc(-1 * ${SCALES.pr(0.28)});
          }
          .tab:before {
            position: absolute;
            top: ${SCALES.pt(0.48)};
            left: ${leftSpace ? 'var(--tabs-item-hover-left)' : 0};
            right: ${leftSpace ? 'var(--tabs-item-hover-right)' : 0};
            bottom: ${SCALES.pb(0.48)};
            content: '';
            z-index: -1;
            transition: opacity 150ms ease;
            background-color: transparent;
            border-radius: 4px;
          }
          .tab:hover::before {
            background-color: ${theme.palette.accents_2};
          }
          .tab:hover {
            color: ${theme.palette.foreground};
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
            background-color: ${theme.palette.foreground};
            transition: opacity, transform 200ms ease-in;
            opacity: 0;
          }
          .tab.active:after {
            opacity: 1;
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
  }, [value, label, disabled])

  /* eslint-disable react/jsx-no-useless-fragment */
  return isActive ? <>{children}</> : null
}

TabsItemComponent.defaultProps = defaultProps
TabsItemComponent.displayName = 'GeistTabsItem'
const TabsItem = withScaleable(TabsItemComponent)
export default TabsItem
/* eslint-enable */
