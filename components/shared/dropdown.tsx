import React, { MutableRefObject, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import usePortal from '../utils/use-portal'
import useResize from '../utils/use-resize'
import CSSTransition from './css-transition'
import useClickAnyWhere from '../utils/use-click-anywhere'

interface Props {
  parent?: MutableRefObject<HTMLElement | null> | undefined
  visible: boolean
}

interface ReactiveDomReact {
  top: number
  left: number
  right: number
  width: number
}

const defaultRect: ReactiveDomReact = {
  top: -1000,
  left: -1000,
  right: -1000,
  width: 0,
}

const getRect = (ref: MutableRefObject<HTMLElement | null>): ReactiveDomReact => {
  if (!ref || !ref.current) return defaultRect
  const rect = ref.current.getBoundingClientRect()
  return {
    ...rect,
    width: rect.width || (rect.right - rect.left),
    top: rect.bottom + document.documentElement.scrollTop,
    left: rect.left + document.documentElement.scrollLeft,
  }
}

const Dropdown: React.FC<React.PropsWithChildren<Props>> = React.memo(({
  children, parent, visible,
}) => {
  const el = usePortal('dropdown')
  const [rect, setRect] = useState<ReactiveDomReact>(defaultRect)
  if (!parent) return null
  
  const updateRect = () => {
    const { top, left, right, width: nativeWidth } = getRect(parent)
    setRect({ top, left, right, width: nativeWidth })
  }

  useResize(updateRect)
  useClickAnyWhere(() => {
    const { top, left } = getRect(parent)
    const shouldUpdatePosition = top !== rect.top || left !== rect.left
    if (!shouldUpdatePosition) return
    updateRect()
  })
  useEffect(() => {
    if (!parent || !parent.current) return
    parent.current.addEventListener('mouseenter', updateRect)
    /* istanbul ignore next */
    return () => {
      if (!parent || !parent.current) return
      parent.current.removeEventListener('mouseenter', updateRect)
    }
  }, [parent])

  const clickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
    event.preventDefault()
  }

  if (!el) return null
  return createPortal((
    <CSSTransition visible={visible}>
      <div className="dropdown" onClick={clickHandler}>
        {children}
        <style jsx>{`
        .dropdown {
          position: absolute;
          width: ${rect.width}px;
          top: ${rect.top + 2}px;
          left: ${rect.left}px;
          z-index: 1100;
        }
      `}</style>
      </div>
    </CSSTransition>
  ), el)
})

export default Dropdown
