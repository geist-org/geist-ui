import React, { MutableRefObject, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import usePortal from '../utils/use-portal'
import useResize from '../utils/use-resize'
import CssTransition from './css-transition'
import useClickAnyWhere from '../utils/use-click-anywhere'
import useDOMObserver from '../utils/use-dom-observer'
import useWarning from '../utils/use-warning'

interface Props {
  parent?: MutableRefObject<HTMLElement | null> | undefined
  visible: boolean
  disableMatchWidth?: boolean
  getPopupContainer?: () => HTMLElement | null
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

const getOffset = (el?: HTMLElement | null | undefined) => {
  if (!el)
    return {
      top: 0,
      left: 0,
    }
  const { top, left } = el.getBoundingClientRect()
  return { top, left }
}

const getRect = (
  ref: MutableRefObject<HTMLElement | null>,
  getContainer?: () => HTMLElement | null,
): ReactiveDomReact => {
  if (!ref || !ref.current) return defaultRect
  const rect = ref.current.getBoundingClientRect()
  const container = getContainer ? getContainer() : null
  const scrollElement = container || document.documentElement
  const { top: offsetTop, left: offsetLeft } = getOffset(container)

  return {
    ...rect,
    width: rect.width || rect.right - rect.left,
    top: rect.bottom + scrollElement.scrollTop - offsetTop,
    left: rect.left + scrollElement.scrollLeft - offsetLeft,
  }
}

const Dropdown: React.FC<React.PropsWithChildren<Props>> = React.memo(
  ({ children, parent, visible, disableMatchWidth, getPopupContainer }) => {
    const el = usePortal('dropdown', getPopupContainer)
    const [rect, setRect] = useState<ReactiveDomReact>(defaultRect)
    if (!parent) return null

    /* istanbul ignore next */
    if (process.env.NODE_ENV !== 'production') {
      if (getPopupContainer && getPopupContainer()) {
        const el = getPopupContainer()
        const style = window.getComputedStyle(el as HTMLDivElement)
        if (style.position === 'static') {
          useWarning(
            'The element specified by "getPopupContainer" must have "position" set.',
          )
        }
      }
    }

    const updateRect = () => {
      const { top, left, right, width: nativeWidth } = getRect(parent, getPopupContainer)
      setRect({ top, left, right, width: nativeWidth })
    }

    useResize(updateRect)
    useClickAnyWhere(() => {
      const { top, left } = getRect(parent, getPopupContainer)
      const shouldUpdatePosition = top !== rect.top || left !== rect.left
      if (!shouldUpdatePosition) return
      updateRect()
    })
    useDOMObserver(parent, () => {
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
      event.nativeEvent.stopImmediatePropagation()
      event.preventDefault()
    }
    const mouseDownHandler = (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault()
    }

    if (!el) return null
    return createPortal(
      <CssTransition visible={visible}>
        <div
          className={`dropdown ${disableMatchWidth ? 'disable-match' : 'width-match'}`}
          onClick={clickHandler}
          onMouseDown={mouseDownHandler}>
          {children}
          <style jsx>{`
            .dropdown {
              position: absolute;
              top: ${rect.top + 2}px;
              left: ${rect.left}px;
              z-index: 1100;
            }

            .width-match {
              width: ${rect.width}px;
            }

            .disable-match {
              min-width: ${rect.width}px;
            }
          `}</style>
        </div>
      </CssTransition>,
      el,
    )
  },
)

export default Dropdown
