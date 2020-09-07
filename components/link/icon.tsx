import React from 'react'

export interface LinkIconProps {
  icon: React.ReactNode
  className?: string
}

export const LinkIcon: React.FC<LinkIconProps> = ({ icon, className }) => {
  return (
    <span className={`icon ${className}`}>
      {icon}
      <style jsx>{`
        .icon {
          margin: 0 5px;
          display: inline-flex;
          align-self: center;
          color: currentColor;
          width: 1rem;
        }
      `}</style>
    </span>
  )
}

export default React.memo(LinkIcon)
