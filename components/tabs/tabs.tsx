import React, { useEffect, useMemo, useState } from 'react'
import TabsItem from './tabs-item'
import useTheme from '../styles/use-theme'
import { TabsLabelItem, TabsConfig, TabsContext } from './tabs-context'
import useCurrentState from '../utils/use-current-state'
import useWarning from '../utils/use-warning'

interface Props {
  initialValue?: string
  value?: string
  onChange?: (val: string) => void
  className?: string
}

const defaultProps = {
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type TabsProps = Props & typeof defaultProps & NativeAttrs

const Tabs: React.FC<React.PropsWithChildren<TabsProps>> = ({
  initialValue: userCustomInitialValue,
  value,
  children,
  onChange,
  className,
  ...props
}) => {
  const theme = useTheme()
  const [selfValue, setSelfValue] = useState<string | undefined>(userCustomInitialValue)
  const [tabs, setTabs, tabsRef] = useCurrentState<Array<TabsLabelItem>>([])

  const register = (next: TabsLabelItem) => {
    const hasItem = tabsRef.current.find(item => item.value === next.value)
    if (hasItem) {
      useWarning('The "value" of each "Tabs.Item" must be unique.', 'Tabs')
    }
    setTabs([...tabsRef.current, next])
  }
  const unregister = (next: TabsLabelItem) => {
    const nextTabs = tabsRef.current.filter(item => item.value !== next.value)
    setTabs([...nextTabs])
  }

  const initialValue = useMemo<TabsConfig>(
    () => ({
      register,
      unregister,
      currentValue: selfValue,
      inGroup: true,
    }),
    [selfValue],
  )

  useEffect(() => {
    if (value === undefined) return
    setSelfValue(value)
  }, [value])

  const clickHandler = (item: TabsLabelItem) => {
    if (item.disabled) return
    setSelfValue(item.value)
    onChange && onChange(item.value)
  }

  return (
    <TabsContext.Provider value={initialValue}>
      <div className={`tabs ${className}`} {...props}>
        <header>
          {tabs.map((item, index) => (
            <div
              className={`tab ${selfValue === item.value ? 'active' : ''} ${
                item.disabled ? 'disabled' : ''
              }`}
              key={item.value + index}
              onClick={() => clickHandler(item)}>
              {item.label}
            </div>
          ))}
        </header>
        <div className="content">{children}</div>
        <style jsx>{`
          .tabs {
            width: initial;
          }

          header {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            border-bottom: 1px solid ${theme.palette.border};
          }

          .content {
            padding-top: 0.625rem;
          }

          .tab {
            padding: ${theme.layout.gapQuarter} calc(0.65 * ${theme.layout.gapQuarter});
            cursor: pointer;
            outline: 0;
            transition: all 200ms ease;
            text-transform: capitalize;
            font-size: 1rem;
            margin: 0 calc(0.8 * ${theme.layout.gapHalf});
            color: ${theme.palette.accents_6};
            user-select: none;
            display: flex;
            align-items: center;
            line-height: 1.25rem;
            position: relative;
          }

          .tab:after {
            position: absolute;
            content: '';
            bottom: -1px;
            left: 0;
            right: 0;
            width: 100%;
            height: 2px;
            transform: scaleX(0.85);
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
    </TabsContext.Provider>
  )
}

type TabsComponent<P = {}> = React.FC<P> & {
  Item: typeof TabsItem
  Tab: typeof TabsItem
}
type ComponentProps = Partial<typeof defaultProps> &
  Omit<Props, keyof typeof defaultProps> &
  NativeAttrs

Tabs.defaultProps = defaultProps

export default Tabs as TabsComponent<ComponentProps>
