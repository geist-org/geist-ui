import React, { useEffect, useRef, useState } from 'react'
import withDefaults from '../utils/with-defaults'
import { getRealShape } from '../utils/collections'

interface Props {
  isExpanded?: boolean
  delay?: number
}

const defaultProps = {
  isExpanded: false,
  delay: 200,
}

export type ExpandProps = Props & typeof defaultProps

const Expand: React.FC<React.PropsWithChildren<ExpandProps>> = ({
  isExpanded, delay, children,
}) => {
  const [height, setHeight] = useState<string>(isExpanded ? 'auto' : '0')
  const [selfExpanded, setSelfExpanded] = useState<boolean>(isExpanded)
  const [visible, setVisible] = useState<boolean>(isExpanded)
  const contentRef = useRef<HTMLDivElement>(null)
  const entryTimer = useRef<number>()
  const leaveTimer = useRef<number>()
  const resetTimer = useRef<number>()
  
  const setRealHeight = () => {
    const { height: elHeight } = getRealShape(contentRef.current)
    setHeight(`${elHeight}px`)
  }

  useEffect(() => {
    if (!contentRef || !contentRef.current) return
    setRealHeight()
  }, [contentRef])
  
  useEffect(() => {
    // show element or reset height
    if (isExpanded) {
      setVisible(isExpanded)
    } else {
      setRealHeight()
    }
    
    // show expand animation
    entryTimer.current = window.setTimeout(() => {
      setSelfExpanded(isExpanded)
      clearTimeout(entryTimer.current)
    }, 30)

    // Reset height after animation
    if (isExpanded) {
      resetTimer.current = window.setTimeout(() => {
        setHeight('auto')
        clearTimeout(resetTimer.current)
      }, delay)
    } else {
      leaveTimer.current = window.setTimeout(() => {
        setVisible(isExpanded)
        clearTimeout(leaveTimer.current)
      }, delay / 2)
    }
    
    return () => {
      clearTimeout(entryTimer.current)
      clearTimeout(leaveTimer.current)
      clearTimeout(resetTimer.current)
    }
  }, [isExpanded])

  return (
    <div className={`container ${selfExpanded ? 'expanded' : ''}`}>
      <div ref={contentRef} className="content">{children}</div>
  
      <style jsx>{`
        .container {
          padding: 0;
          margin: 0;
          height: 0;
          overflow: hidden;
          visibility: ${visible ? 'visible' : 'hidden'};
          transition: height ${delay}ms ease;
        }

        .expanded {
          height: ${height};
          visibility: visible;
        }
      `}</style>
    </div>
  )
}

export default withDefaults(Expand, defaultProps)
