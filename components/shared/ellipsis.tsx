import React from 'react'

const Ellipsis: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <span>
      {children}
      <style jsx>{`
        span {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          min-width: 0;
        }
      `}</style>
    </span>
  )
}

export default React.memo(Ellipsis)
