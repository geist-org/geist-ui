import React, { useEffect, useState } from 'react'
import useTheme from 'components/use-theme'

const DEFAULT_OPACITY = 0.75
const LOADING_OPACITY = 0.45

const SidebarSkeleton: React.FC<unknown> = () => {
  const theme = useTheme()
  const [opacity, setOpacity] = useState(DEFAULT_OPACITY)
  useEffect(() => {
    const timer = setInterval(() => {
      setOpacity(opacity =>
        opacity !== DEFAULT_OPACITY ? DEFAULT_OPACITY : LOADING_OPACITY,
      )
    }, 600)
    return () => {
      window.clearTimeout(timer)
    }
  }, [])
  return (
    <div className="skeleton">
      <div className="item" style={{ width: '50%' }} />
      <div className="item" style={{ width: '65%' }} />
      <div className="item" style={{ width: '75%' }} />
      <div className="item" style={{ width: '75%' }} />
      <div className="space" />
      <div className="item" style={{ width: '50%' }} />
      <div className="item" style={{ width: '65%' }} />
      <div className="item" />
      <div className="item" />
      <div className="item" />
      <style jsx>{`
        .skeleton {
          width: 100%;
        }
        .item {
          width: 100%;
          height: 20px;
          border-radius: 6px;
          margin: 8px 0;
          background-color: ${theme.palette.accents_2};
          opacity: ${opacity};
          transition: opacity 350ms linear;
        }
        .space {
          margin: 40px 0;
        }
      `}</style>
    </div>
  )
}

export default SidebarSkeleton
