import React from 'react'

export const LinkIconComponent: React.FC<unknown> = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      width="0.9375em"
      height="0.9375em"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      shapeRendering="geometricPrecision"
      className="icon">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <path d="M15 3h6v6" />
      <path d="M10 14L21 3" />

      <style jsx>{`
        .icon {
          margin: 0 0 -1px 0.1875em;
          display: inline-flex;
          align-self: center;
          color: currentColor;
        }
      `}</style>
    </svg>
  )
}

LinkIconComponent.displayName = 'GeistLinkIcon'
const LinkIcon = React.memo(LinkIconComponent)
export default LinkIcon
