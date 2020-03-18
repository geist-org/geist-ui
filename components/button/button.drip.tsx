import React, { useEffect, useRef } from 'react'
import withDefaults from '../utils/with-defaults'

interface Props {
  x?: number
  y?: number
  color?: string
  onCompleted?: Function
}

const defaultProps = {
  x: 0,
  y: 0,
  onCompleted: () => {},
}

export type ButtonDrip = Props & typeof defaultProps

const ButtonDrip: React.FC<ButtonDrip> = React.memo(({
  x, y, color, onCompleted
}) => {
  const dripRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!dripRef.current) return
    dripRef.current.addEventListener('animationend', onCompleted)
    return () => {
      if (!dripRef.current) return
      dripRef.current.removeEventListener('animationend', onCompleted)
    }
  })
  
  return (
    <div ref={dripRef} className="drip">
      <svg width="20" height="20" viewBox="0 0 20 20"
        style={{ top: y - 10, left: x - 10 }}>
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g fill={color}><rect width="100%" height="100%" rx="10" /></g>
        </g>
      </svg>
  
      <style jsx>{`
        .drip {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
        }

        svg {
          position: absolute;
          animation: 400ms ease-in expand;
          animation-fill-mode: forwards;
          width: 20px;
          height: 20px;
        }
        
        @keyframes expand {
          0% {
            opacity: 0;
            transform: scale(1);
          }
          30% {
            opacity: 1;
          }
          80% {
            opacity: 0.5;
          }
          100% {
            transform: scale(25);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
})

export default withDefaults(ButtonDrip, defaultProps)

