import React from 'react'
import useTheme from '../styles/use-theme'

type Props = {
  headerHeight: number
  selected?: string
  tabs: { title: string; value: string }[]
}
export const WindowTabs: React.FC<Props> = ({ tabs, selected, headerHeight }) => {
  const theme = useTheme()
  return (
    <>
      {tabs.map(tab => {
        if (tab.value !== selected) {
          return (
            <div className="window-tab" key={tab.title + tab.value}>
              {tab.title}
            </div>
          )
        } else {
          return (
            <div className="window-tab active" key={tab.title + tab.value}>
              {tab.title}
            </div>
          )
        }
      })}
      <style jsx>{`
        .window-tab {
          display: inline-flex;
          padding: ${(headerHeight! - 2 - 18) / 2}px 20px;
          border: 1px solid transparent;
        }
        .window-tab.active {
          border-top-left-radius: ${theme.layout.radius};
          border-top-right-radius: ${theme.layout.radius};
          border-bottom: 1px solid ${theme.palette.accents_2};
          border: 1px solid ${theme.palette.accents_2};
          border-bottom-color: ${theme.palette.background};
          background: ${theme.palette.background};
        }
      `}</style>
    </>
  )
}
