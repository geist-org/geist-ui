import React, {
  CSSProperties,
  MouseEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import useTheme from '../use-theme'
import { TabsHeaderItem, TabsConfig, TabsContext } from './tabs-context'
import useScale, { withScale } from '../use-scale'
import Highlight from '../shared/highlight'
import { useRect } from '../utils/layouts'
import { isGeistElement } from '../utils/collections'
import useClasses from '../use-classes'

interface Props {
  initialValue?: string
  value?: string
  hideDivider?: boolean
  hideBorder?: boolean
  highlight?: boolean
  onChange?: (val: string) => void
  className?: string
  leftSpace?: CSSProperties['marginLeft']
  hoverHeightRatio?: number
  hoverWidthRatio?: number
  align?: CSSProperties['justifyContent']
  activeClassName?: string
  activeStyles?: CSSProperties
}

const defaultProps = {
  className: '',
  hideDivider: false,
  highlight: true,
  leftSpace: '12px' as CSSProperties['marginLeft'],
  hoverHeightRatio: 0.7,
  hoverWidthRatio: 1.15,
  activeClassName: '',
  activeStyle: {},
  align: 'left',
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type TabsProps = Props & NativeAttrs

const TabsComponent: React.FC<React.PropsWithChildren<TabsProps>> = ({
  initialValue: userCustomInitialValue,
  value,
  hideDivider,
  hideBorder,
  children,
  onChange,
  className,
  leftSpace,
  highlight,
  hoverHeightRatio,
  hoverWidthRatio,
  activeClassName,
  activeStyle,
  align,
  ...props
}: React.PropsWithChildren<TabsProps> & typeof defaultProps) => {
  const theme = useTheme()
  const { SCALES } = useScale()
  const [tabs, setTabs] = useState<Array<TabsHeaderItem>>([])
  const [selfValue, setSelfValue] = useState<string | undefined>(userCustomInitialValue)
  const ref = useRef<HTMLDivElement | null>(null)
  const [displayHighlight, setDisplayHighlight] = useState<boolean>(false)
  const { rect, setRect } = useRect()

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
  const tabItemMouseOverHandler = (event: MouseEvent<HTMLDivElement>) => {
    if (!isGeistElement(event.target as HTMLDivElement)) return
    setRect(event, () => ref.current)
    if (highlight) {
      setDisplayHighlight(true)
    }
  }

  return (
    <TabsContext.Provider value={initialValue}>
      <div className={useClasses('tabs', className)} {...props}>
        <header ref={ref} onMouseLeave={() => setDisplayHighlight(false)}>
          <Highlight
            rect={rect}
            visible={displayHighlight}
            hoverHeightRatio={hoverHeightRatio}
            hoverWidthRatio={hoverWidthRatio}
          />
          <div
            className={useClasses('scroll-container', { 'hide-divider': hideDivider })}>
            {tabs.map(({ cell: Cell, value }) => (
              <Cell
                key={value}
                onClick={clickHandler}
                onMouseOver={tabItemMouseOverHandler}
                activeClassName={activeClassName}
                activeStyle={activeStyle}
                hideBorder={hideBorder}
              />
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
            justify-content: ${align};
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
const Tabs = withScale(TabsComponent)
export default Tabs
