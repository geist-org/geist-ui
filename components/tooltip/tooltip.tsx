import React, { useEffect, useRef, useState, MouseEvent } from 'react'
import withDefaults from '../utils/with-defaults'
import TooltipContent from './tooltip-content'
import useClickAway from '../utils/use-click-away'
import { TriggerTypes, Placement, SnippetColors } from '../utils/prop-types'

export type TooltipOnVisibleChange = (visible: boolean) => void

type EventHandlerWithChangeVisible = (
  event: React.MouseEvent<any, globalThis.MouseEvent>,
  changeVisible: (nextState: boolean) => void,
) => void | undefined

export interface TooltipProps {
  text: string | React.ReactNode
  color?: SnippetColors
  placement?: Placement
  visible?: boolean
  defaultVisible?: boolean
  hideArrow?: boolean
  trigger?: TriggerTypes
  enterDelay?: number
  leaveDelay?: number
  offset?: number
  className?: string
  portalClassName?: string
  onVisibleChange?: TooltipOnVisibleChange
  onMouseEnter?: EventHandlerWithChangeVisible
  onMouseLeave?: EventHandlerWithChangeVisible
  onClick?: EventHandlerWithChangeVisible
  onClickAway?: (event: Event, changeVisible: (nextState: boolean) => void) => void
}

export const defaultProps = {
  defaultVisible: false,
  hideArrow: false,
  color: 'default' as SnippetColors,
  trigger: 'hover' as TriggerTypes,
  placement: 'top' as Placement,
  enterDelay: 100,
  leaveDelay: 0,
  offset: 12,
  className: '',
  portalClassName: '',
  onVisibleChange: (() => {}) as TooltipOnVisibleChange,
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof TooltipProps>
type Props = TooltipProps & NativeAttrs

const Tooltip: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  defaultVisible,
  text,
  offset,
  placement,
  portalClassName,
  enterDelay,
  leaveDelay,
  trigger,
  color,
  className,
  onVisibleChange,
  hideArrow,
  visible: customVisible,
  onMouseEnter,
  onMouseLeave,
  onClick,
  onClickAway,
  ...props
}: Props & typeof defaultProps) => {
  const timer = useRef<number>()
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState<boolean>(
    customVisible === undefined ? defaultVisible : customVisible,
  )

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
    timer.current = window.setTimeout(() => handler(false), leaveDelay)
  }

  const mouseEventHandler = (e: MouseEvent, next: boolean) => {
    if (customVisible === undefined) trigger === 'hover' && changeVisible(next)
    if (next) onMouseEnter && onMouseEnter(e, changeVisible)
    else onMouseLeave && onMouseLeave(e, changeVisible)
  }
  const clickEventHandler = () => trigger === 'click' && changeVisible(!visible)

  const clickAwayHandler: (e: Event) => void = e => {
    if (customVisible === undefined) trigger === 'click' && changeVisible(false)
    onClickAway && onClickAway(e, changeVisible)
  }

  useClickAway(ref, clickAwayHandler)

  useEffect(() => {
    if (customVisible === undefined) return
    changeVisible(customVisible)
  }, [customVisible])

  const contentProps = {
    color,
    visible,
    offset,
    placement,
    hideArrow,
    parent: ref,
    className: portalClassName,
  }

  return (
    <div
      ref={ref}
      className={`tooltip ${className}`}
      onClick={clickEventHandler}
      onMouseEnter={e => mouseEventHandler(e, true)}
      onMouseLeave={e => mouseEventHandler(e, false)}
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

export default withDefaults(Tooltip, defaultProps)
