import React, { useMemo } from 'react'
import useTheme from '../use-theme'
import Tooltip, { TooltipProps } from '../tooltip/tooltip'
import { Placement, TriggerTypes } from '../utils/prop-types'
import { getReactNode } from '../utils/collections'

export type PopoverTriggerTypes = TriggerTypes
export type PopoverPlacement = Placement
interface Props {
  content?: React.ReactNode | (() => React.ReactNode)
  trigger?: PopoverTriggerTypes
  placement?: Placement
}

const defaultProps = {
  trigger: 'click' as PopoverTriggerTypes,
  placement: 'bottom' as Placement,
  portalClassName: '',
}

type ExcludeTooltipProps = {
  type: any
  text: any
  trigger: any
  placement: any
}

export type PopoverProps = Props & Omit<TooltipProps, keyof ExcludeTooltipProps>

const Popover: React.FC<React.PropsWithChildren<PopoverProps>> = ({
  content,
  children,
  trigger,
  placement,
  portalClassName,
  ...props
}) => {
  const theme = useTheme()
  const textNode = useMemo(() => getReactNode(content), [content])

  return (
    <Tooltip
      text={textNode}
      trigger={trigger}
      placement={placement}
      portalClassName={`popover ${portalClassName}`}
      {...props}>
      {children}
      <style jsx>{`
        :global(.tooltip-content.popover > .inner) {
          padding: ${theme.layout.gapHalf} 0;
          text-align: center;
        }
      `}</style>
    </Tooltip>
  )
}

Popover.defaultProps = defaultProps
Popover.displayName = 'GeistPopover'
export default Popover
