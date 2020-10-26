import React from 'react'
import useTheme from '../styles/use-theme'
import { LockIcon } from './https-lock-icon'
import { RefreshIcon } from './browser-refresh'

export const BrowserBar: React.FC<{ url: string }> = ({ url }) => {
  const theme = useTheme()
  return (
    <div className="browser-bar">
      <div style={{ flexBasis: 140, flexShrink: 0 }} />
      <div className="browser-input">
        <LockIcon color={theme.palette.cyanDark} />
        <a className="url-text" href={url} target="_blank" rel="noreferrer noopener">
          {url}
        </a>
        <RefreshIcon />
      </div>
      <div style={{ flexBasis: 140, flexShrink: 0 }} />
      <style jsx>{`
        .browser-bar {
          flex: 1 1;
          color: ${theme.palette.foreground};
          height: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .browser-input {
          flex: 1 1;
          background: ${theme.palette.accents_1};
          border-radius: 3px;
          height: 70%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 ${theme.layout.gapHalf};
          position: relative;
        }
        .url-text {
          white-space: nowrap;
          line-height: 1.25rem;
          font-size: 0.75rem;
          flex: 1 1;
          margin: 0 ${theme.layout.gapQuarter};
          max-width: 100%;
          display: block;
          text-overflow: ellipsis;
          overflow: hidden;
          color: ${theme.palette.foreground};
        }
      `}</style>
    </div>
  )
}
