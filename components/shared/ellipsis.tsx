import React from 'react'

export type EllipsisProps = {
  height: string
}

const Ellipsis: React.FC<React.PropsWithChildren<EllipsisProps>> = ({
  children,
  height,
}) => {
  return (
    <span>
      {children}
      <style jsx>{`
        span {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height: ${height};
          min-width: 0;
        }
      `}</style>
    </span>
  )
}

export default React.memo(Ellipsis)
