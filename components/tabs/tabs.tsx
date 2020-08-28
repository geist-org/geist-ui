import React, {
  useMemo,
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useCallback,
  RefObject,
  CSSProperties,
} from 'react'
import { TabsItemConfig, TabsConfig, TabsContext, Handles } from './tabs-context'
import TabsItem from './tabs-item'
import useTheme from '../styles/use-theme'

import { TabVarient } from '../utils/prop-types'
import TabsNav from './tabs-nav'
import useTabsHandle from './use-tabs-handle'

export interface Props {
  style?: CSSProperties
  initialValue?: string
  value?: string
  onChange?: (val: string) => void
  className?: string
  varient?: TabVarient
  showDivider?: boolean
}

const defaultProps = {
  varient: 'line' as TabVarient,
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>
export type TabsProps = React.PropsWithChildren<Props & NativeAttrs>

const Tabs = forwardRef<Handles, TabsProps>(
  (
    {
      initialValue: userCustomInitialValue,
      value,
      children,
      varient,
      onChange,
      className,
      showDivider,
      ...props
    }: TabsProps & typeof defaultProps,
    ref: RefObject<Handles>,
  ) => {
    const theme = useTheme()
    const [currentTab, setCurrentTab] = useState<string | undefined>(userCustomInitialValue)
    const [tabs, setTabs] = useState<TabsItemConfig[]>([])

    useImperativeHandle(
      ref,
      () => ({
        setCurrentTab(v) {
          setCurrentTab(v)
        },
        getCurrentTab() {
          return currentTab
        },
      }),
      [currentTab],
    )

    const register = useCallback((next: TabsItemConfig | { remove: string }) => {
      setTabs(last => {
        if ('remove' in next) {
          return last.filter(({ value }) => value !== next.remove)
        } else {
          const hasItem = last.find(item => item.value === next.value)
          if (!hasItem) return [...last, next]
          return last.map(item => {
            if (item.value !== next.value) return item
            return {
              ...item,
              ...next,
            }
          })
        }
      })
    }, [])

    const ctx = useMemo<TabsConfig>(
      () => ({
        register,
        currentValue: currentTab,
      }),
      [currentTab],
    )

    const clickHandler = (tabValue: string) => {
      if (!value) {
        //uncontrolled
        setCurrentTab(tabValue)
      }
      onChange && onChange(tabValue)
    }

    useEffect(() => {
      //controlled component
      if (value) {
        setCurrentTab(value)
      }
    }, [value])

    return (
      <TabsContext.Provider value={ctx}>
        <div className={`${className}`} {...props}>
          <header>
            {tabs.map(({ value, disabled, ...extra }) => {
              return (
                <div
                  className={`tab ${currentTab === value ? 'active' : ''}`}
                  role="button"
                  key={value}
                  onClick={() => !disabled && clickHandler(value)}>
                  <TabsNav
                    varient={varient}
                    status={{
                      disabled: disabled,
                      active: currentTab === value,
                      default: true,
                    }}
                    {...extra}></TabsNav>
                </div>
              )
            })}
          </header>
          <div className="content">{children}</div>
          <style jsx>{`
            header {
              display: flex;
              flex-wrap: nowrap;
              overflow-x: auto;
              align-items: center;
              border-bottom: ${showDivider ? `1px solid ${theme.palette.border}` : ''};
            }
            ::-webkit-scrollbar {
              display: none;
            }
            .content {
              padding-top: 0.625rem;
            }

            .tab {
              cursor: pointer;
              outline: 0;
              text-transform: capitalize;
              font-size: 1rem;
              margin: 0 1px;
              user-select: none;
              display: flex;
              align-items: center;
              line-height: 1.25rem;
              position: relative;
              font-variant-numeric: tabular-nums;
            }
            .tab:first-of-type {
              margin-left: 0;
            }
          `}</style>
        </div>
      </TabsContext.Provider>
    )
  },
)

Tabs.defaultProps = defaultProps

export default Tabs as typeof Tabs & {
  Item: typeof TabsItem
  Tab: typeof TabsItem
  useTabsHandle: typeof useTabsHandle
}
