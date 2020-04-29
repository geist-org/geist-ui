import React, { useMemo } from 'react'
import useTheme from '../styles/use-theme'
import Tooltip, { TooltipProps } from '../tooltip/tooltip'
import PopoverItem from '../popover/popover-item'
import { Placement, TriggerTypes } from '../utils/prop-types'
import { getReactNode } from '../utils/collections'

interface Props {
  content?: React.ReactNode | (() => React.ReactNode)
  trigger?: TriggerTypes
  placement?: Placement
}

const defaultProps = {
  trigger: 'click' as TriggerTypes,
  placement: 'bottom' as Placement,
}

type ExcludeTooltipProps = {
  type: any
  text: any
  trigger: any
  placement: any
}

export type PopoverProps = Props & Omit<TooltipProps, keyof ExcludeTooltipProps>

const Popover: React.FC<React.PropsWithChildren<PopoverProps>> = ({
  content, children, trigger, placement, portalClassName, ...props
}) => {
  const theme = useTheme()
  const textNode = useMemo(() => getReactNode(content), [content])
  
  return (
    <Tooltip text={textNode} trigger={trigger} placement={placement}
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


type PopoverComponent<P = {}> = React.FC<P> & {
  Item: typeof PopoverItem
  Option: typeof PopoverItem
}
type ComponentProps = Partial<typeof defaultProps>
& Omit<Props, keyof typeof defaultProps>
& Partial<Omit<TooltipProps, keyof ExcludeTooltipProps>>

Popover.defaultProps = defaultProps

export default Popover as PopoverComponent<ComponentProps>
