import React from 'react'

interface Props {
  count: number
}

const TreeIndents: React.FC<Props> = ({ count }) => {
  if (count === 0) return null
  return (
    <>
      {[...new Array(count)].map((_, index) => (
        <span className="indent" key={`indent-${index}`}>
          <style jsx>{`
            span.indent {
              left: calc(-1.875rem * ${index + 1}  + .75rem);
            }
          `}</style>
        </span>
      ))}
    </>
  )
}

export default TreeIndents
