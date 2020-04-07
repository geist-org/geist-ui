import React, { useMemo, useRef, useState } from 'react'
import useTheme from '../styles/use-theme'
import withDefaults from '../utils/with-defaults'
import TooltipContent from './tooltip-content'
import useClickAway from '../utils/use-click-away'
import { ZeitUIThemesPalette } from 'components/styles/themes'
import { TriggerTypes, Placement, NormalTypes } from '../utils/prop-types'

interface Props {
  text: string | React.ReactNode
  type?: NormalTypes
  placement?: Placement
  initialVisible?: boolean
  trigger?: TriggerTypes
  enterDelay?: number
  leaveDelay?: number
  offset?: number
}

const defaultProps = {
  initialVisible: false,
  type: 'default' as NormalTypes,
  trigger: 'hover' as TriggerTypes,
  placement: 'top',
  enterDelay: 100,
  leaveDelay: 300,
  offset: 12,
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type TooltipProps = Props & typeof defaultProps & NativeAttrs

const getBgColor = (
  type: NormalTypes,
  palette: ZeitUIThemesPalette,
) => {
  const colors: { [key in NormalTypes ]: string } = {
    default: palette.foreground,
    success: palette.success,
    warning: palette.warning,
    error: palette.error,
    secondary: palette.secondary,
  }
  return colors[type]
}

const Tooltip: React.FC<React.PropsWithChildren<TooltipProps>> = ({
  children, initialVisible, text, offset, placement,
  enterDelay, leaveDelay, trigger, type,
}) => {
  const theme = useTheme()
  const timer = useRef<number>()
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState<boolean>(initialVisible)
  const bgColor = useMemo(() => getBgColor(type, theme.palette), [type, theme.palette])
  
  const changeVisible = (nextState: boolean) => {
    const clear = () => {
      clearTimeout(timer.current)
      timer.current = undefined
    }
    if (nextState) {
      timer.current = window.setTimeout(() => {
        setVisible(true)
        clear()
      }, enterDelay)
    } else {
      clear()
      timer.current = window.setTimeout(() => {
        setVisible(false)
        clear()
      }, leaveDelay)
    }
  }
  const mouseEventHandler = (nextState: boolean) => {
    if (trigger !== 'hover') return
    changeVisible(nextState)
  }
  const clickEventHandler = () => {
    if (trigger !== 'click') return
    changeVisible(!visible)
  }
  
  useClickAway(ref, () => {
    if (trigger !== 'click') return
    changeVisible(false)
  })
  
  return (
    <div ref={ref} className="tooltip" onClick={clickEventHandler}
      onMouseEnter={() => mouseEventHandler(true)}
      onMouseLeave={() => mouseEventHandler(false)}>
      {children}
      <TooltipContent parent={ref} visible={visible}
        offset={offset}
        bgColor={bgColor}
        placement={placement}>
        {text}
      </TooltipContent>
      <style jsx>{`
        .tooltip {
          width: min-content;
        }
      `}</style>
    </div>
  )
}

export default withDefaults(Tooltip, defaultProps)
