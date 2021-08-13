import React, { useEffect, useMemo, useRef, useState } from 'react'
import TooltipContent, { TooltipIconOffset } from './tooltip-content'
import useClickAway from '../utils/use-click-away'
import { TriggerTypes, Placement, SnippetTypes } from '../utils/prop-types'
import { withScaleable } from '../use-scaleable'
import { getRect } from './helper'

export type TooltipOnVisibleChange = (visible: boolean) => void
export type TooltipTypes = SnippetTypes
export type TooltipTriggers = TriggerTypes
export type TooltipPlacement = Placement
interface Props {
  text: string | React.ReactNode
  type?: TooltipTypes
  placement?: TooltipPlacement
  visible?: boolean
  initialVisible?: boolean
  hideArrow?: boolean
  trigger?: TooltipTriggers
  enterDelay?: number
  leaveDelay?: number
  offset?: number
  className?: string
  portalClassName?: string
  onVisibleChange?: TooltipOnVisibleChange
}

const defaultProps = {
  initialVisible: false,
  hideArrow: false,
  type: 'default' as TooltipTypes,
  trigger: 'hover' as TooltipTriggers,
  placement: 'top' as TooltipPlacement,
  enterDelay: 100,
  leaveDelay: 150,
  offset: 12,
  className: '',
  portalClassName: '',
  onVisibleChange: (() => {}) as TooltipOnVisibleChange,
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type TooltipProps = Props & NativeAttrs

const TooltipComponent: React.FC<React.PropsWithChildren<TooltipProps>> = ({
  children,
  initialVisible,
  text,
  offset,
  placement,
  portalClassName,
  enterDelay,
  leaveDelay,
  trigger,
  type,
  className,
  onVisibleChange,
  hideArrow,
  visible: customVisible,
  ...props
}: React.PropsWithChildren<TooltipProps> & typeof defaultProps) => {
  const timer = useRef<number>()
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState<boolean>(initialVisible)
  const iconOffset = useMemo<TooltipIconOffset>(() => {
    if (!ref?.current) return { x: '0.75em', y: '0.75em' }
    const rect = getRect(ref)
    return {
      x: `${rect.width ? rect.width / 2 : 0}px`,
      y: `${rect.height ? rect.height / 2 : 0}px`,
    }
  }, [ref?.current])
  const contentProps = {
    type,
    visible,
    offset,
    placement,
    hideArrow,
    iconOffset,
    parent: ref,
    className: portalClassName,
  }

  const changeVisible = (nextState: boolean) => {
    const clear = () => {
      clearTimeout(timer.current)
      timer.current = undefined
    }
    const handler = (nextState: boolean) => {
      setVisible(nextState)
      onVisibleChange(nextState)
      clear()
    }
    clear()
    if (nextState) {
      timer.current = window.setTimeout(() => handler(true), enterDelay)
      return
    }
    const leaveDelayWithoutClick = trigger === 'click' ? 0 : leaveDelay
    timer.current = window.setTimeout(() => handler(false), leaveDelayWithoutClick)
  }

  const mouseEventHandler = (next: boolean) => trigger === 'hover' && changeVisible(next)
  const clickEventHandler = () => trigger === 'click' && changeVisible(!visible)

  useClickAway(ref, () => trigger === 'click' && changeVisible(false))
  useEffect(() => {
    if (customVisible === undefined) return
    changeVisible(customVisible)
  }, [customVisible])

  return (
    <div
      ref={ref}
      className={`tooltip ${className}`}
      onClick={clickEventHandler}
      onMouseEnter={() => mouseEventHandler(true)}
      onMouseLeave={() => mouseEventHandler(false)}
      {...props}>
      {children}
      <TooltipContent {...contentProps}>{text}</TooltipContent>
      <style jsx>{`
        .tooltip {
          width: max-content;
          display: inline-block;
        }
      `}</style>
    </div>
  )
}

TooltipComponent.defaultProps = defaultProps
TooltipComponent.displayName = 'GiestTooltip'
const Tooltip = withScaleable(TooltipComponent)
export default Tooltip
