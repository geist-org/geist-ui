import React, { useMemo } from 'react'
import useTheme from '../styles/use-theme'
import Tooltip, { TooltipProps } from '../tooltip/tooltip'
import PopoverItem from '../popover/popover-item'
import { Placement, TriggerTypes } from '../utils/prop-types'
import { getReactNode } from '../utils/collections'

interface Props {
  title?: React.ReactNode | (() => React.ReactNode)
  notSeperateTitle?: boolean
  content?: React.ReactNode | (() => React.ReactNode)
  trigger?: TriggerTypes
  placement?: Placement
}

const defaultProps = {
  notSeperateTitle: false,
  trigger: 'click' as TriggerTypes,
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
  title,
  notSeperateTitle,
  content,
  children,
  trigger,
  placement,
  portalClassName,
  ...props
}) => {
  const theme = useTheme()
  const titleNode = title && useMemo(() => getReactNode(title), [title])
  const textNode = useMemo(() => getReactNode(content), [content])
  props.color = props.color || 'lite'

  return (
    <Tooltip
      text={
        <div>
          {title && (
            <div className="title">
              <PopoverItem title line={!notSeperateTitle}>
                {titleNode}
              </PopoverItem>
            </div>
          )}
          <div className="items">{textNode}</div>
        </div>
      }
      trigger={trigger}
      placement={placement}
      portalClassName={`popover ${portalClassName}`}
      {...props}>
      {children}
      <style jsx>{`
        :global(.tooltip-content.popover) {
          filter: drop-shadow(${theme.expressiveness.D2});
        }
        :global(.tooltip-content.popover > .inner) {
          padding: 0;
          text-align: left;
          min-width: 17.1429rem;
          max-width: 34.2857rem;
        }
        :global(.tooltip-content.popover > .inner .items) {
          max-height: 17.1429rem;
          overflow: auto;
        }
        :global(.tooltip-content.popover > .inner .title .item.title) {
          line-height: 1.1429rem;
          font-weight: 500;
          font-size: 1rem;
          color: ${theme.palette.cNeutral7};
        }
      `}</style>
    </Tooltip>
  )
}

type PopoverComponent<P = {}> = React.FC<P> & {
  Item: typeof PopoverItem
  Option: typeof PopoverItem
}
type ComponentProps = Partial<typeof defaultProps> &
  Omit<Props, keyof typeof defaultProps> &
  Partial<Omit<TooltipProps, keyof ExcludeTooltipProps>>

Popover.defaultProps = defaultProps

export default Popover as PopoverComponent<ComponentProps>
