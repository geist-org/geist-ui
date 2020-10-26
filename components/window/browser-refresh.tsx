import React from 'react'

export const RefreshIcon: React.FC = () => (
  <i
    className="browser_refresh"
    dangerouslySetInnerHTML={{
      __html: `<svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
         stroke-linejoin="round" fill="none" shape-rendering="geometricPrecision" style="color: currentcolor;">
        <path d="M23 4v6h-6"/>
        <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/>
    </svg>`,
    }}
  />
)
