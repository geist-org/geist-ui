import React, { CSSProperties } from 'react'

export const WindowTraffic: React.FC<{ style: CSSProperties }> = ({ style }) => {
  return (
    <div style={style} className="window-header-traffic">
      {/* @ts-ignore */}
      <span
        style={{ '--window-icon-color': '#ff5f56', marginLeft: 8 }}
        className="window-traffic-icon"></span>
      {/* @ts-ignore */}
      <span
        style={{ '--window-icon-color': '#ffbd2e', marginLeft: 8 }}
        className="window-traffic-icon"></span>
      {/* @ts-ignore */}
      <span
        style={{ '--window-icon-color': '#27c93f', marginLeft: 8 }}
        className="window-traffic-icon"></span>
      <style jsx>{`
        .window-header-traffic {
          display: block;
        }
        .window-traffic-icon {
          border-radius: 50%;
          display: inline-block;
          height: 12px;
          width: 12px;
          background-color: var(--window-icon-color);
        }
      `}</style>
    </div>
  )
}
