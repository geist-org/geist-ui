import React, { CSSProperties, useEffect, useMemo, useState } from 'react'
import useTheme from '../use-theme'
import { TabsHeaderItem, TabsConfig, TabsContext } from './tabs-context'
import useScaleable, { withScaleable } from '../use-scaleable'

interface Props {
  initialValue?: string
  value?: string
  hideDivider?: boolean
  onChange?: (val: string) => void
  className?: string
  leftSpace?: CSSProperties
}

const defaultProps = {
  className: '',
  hideDivider: false,
  leftSpace: '20px' as CSSProperties,
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type TabsProps = Props & NativeAttrs

const TabsComponent: React.FC<React.PropsWithChildren<TabsProps>> = ({
  initialValue: userCustomInitialValue,
  value,
  hideDivider,
  children,
  onChange,
  className,
  leftSpace,
  ...props
}: React.PropsWithChildren<TabsProps> & typeof defaultProps) => {
  const theme = useTheme()
  const { SCALES } = useScaleable()
  const [selfValue, setSelfValue] = useState<string | undefined>(userCustomInitialValue)
  const [tabs, setTabs] = useState<Array<TabsHeaderItem>>([])

  const register = (next: TabsHeaderItem) => {
    setTabs(last => {
      const hasItem = last.find(item => item.value === next.value)
      if (!hasItem) return [...last, next]
      return last.map(item => {
        if (item.value !== next.value) return item
        return {
          ...item,
          ...next,
        }
      })
    })
  }

  const initialValue = useMemo<TabsConfig>(
    () => ({
      register,
      currentValue: selfValue,
      inGroup: true,
      leftSpace,
    }),
    [selfValue, leftSpace],
  )

  useEffect(() => {
    if (typeof value === 'undefined') return
    setSelfValue(value)
  }, [value])

  const clickHandler = (value: string) => {
    setSelfValue(value)
    onChange && onChange(value)
  }

  return (
    <TabsContext.Provider value={initialValue}>
      <div className={`tabs ${className}`} {...props}>
        <header>
          <div className={`scroll-container ${hideDivider ? 'hide-divider' : ''}`}>
            {tabs.map(({ cell: Cell, value }) => (
              <Cell key={value} onClick={clickHandler} />
            ))}
          </div>
        </header>
        <div className="content">{children}</div>
        <style jsx>{`
          .tabs {
            font-size: ${SCALES.font(1)};
            width: ${SCALES.width(1, 'initial')};
            height: ${SCALES.height(1, 'auto')};
            padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)} ${SCALES.pl(0)};
            margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
          }
          header {
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            overflow-y: hidden;
            overflow-x: scroll;
            scrollbar-width: none;
            position: relative;
          }
          .scroll-container {
            width: 100%;
            height: 100%;
            flex: 1;
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            border-bottom: 1px solid ${theme.palette.border};
            padding-left: ${leftSpace};
          }
          header::-webkit-scrollbar {
            display: none;
          }
          .hide-divider {
            border-color: transparent;
          }
          .content {
            padding-top: 0.625rem;
          }
        `}</style>
      </div>
    </TabsContext.Provider>
  )
}

TabsComponent.defaultProps = defaultProps
TabsComponent.displayName = 'GeistTabs'
const Tabs = withScaleable(TabsComponent)
export default Tabs
