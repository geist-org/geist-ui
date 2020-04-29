import React from 'react'

interface Props {
  color?: string
}

export const LinkIcon: React.FC<Props> = ({ color }) => {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
      strokeLinejoin="round" fill="none" shapeRendering="geometricPrecision" style={{ color }} className="icon">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
      <path d="M15 3h6v6"/>
      <path d="M10 14L21 3"/>
  
      <style jsx>{`
        .icon {
          margin: 0 5px;
          display: inline-flex;
          align-self: center;
        }
      `}</style>
    </svg>
  )
}

export default React.memo(LinkIcon)
