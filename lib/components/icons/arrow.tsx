import React from 'react'
import { useTheme } from 'components/index'

export interface ArrowProps {
  rotate?: number,
}

export const ArrowIcon: React.FC<ArrowProps> = React.memo(({ rotate }) => {
  const theme = useTheme()
  return (
    <svg viewBox="0 0 24 24"
      width="14" height="14"
      stroke={theme.palette.accents_5}
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
      shapeRendering="geometricPrecision"
      className="arrow"
    >
      <path d="M9 18l6-6-6-6" />
      <style jsx>{`
        .arrow {
          color: ${theme.palette.accents_5};
          transition: all .2s ease-in-out;
          transform: rotate(${rotate}deg);
        }
      `}</style>
    </svg>
  )
})

export default ArrowIcon
