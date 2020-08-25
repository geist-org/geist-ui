import React, { useMemo } from 'react'
import useTheme from '../styles/use-theme'
import Tooltip, { TooltipProps, defaultProps as tooltipDefaultProps } from '../tooltip/tooltip'
import { Placement, TriggerTypes, SnippetColors } from '../utils/prop-types'
import PopoverItem from '../popover/popover-item'
import { getReactNode } from '../utils/collections'

interface Props extends TooltipProps {
  title?: React.ReactNode | (() => React.ReactNode)
  notSeperateTitle?: boolean
  content?: React.ReactNode | (() => React.ReactNode)
}

export const defaultProps = Object.assign({}, tooltipDefaultProps, {
  notSeperateTitle: false,
  portalClassName: '',
  trigger: 'click' as TriggerTypes,
  placement: 'bottom' as Placement,
  color: 'lite' as SnippetColors,
})

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type PopoverProps = Omit<Props, 'text'> & NativeAttrs

const Popover: React.FC<React.PropsWithChildren<PopoverProps>> = ({
  title,
  notSeperateTitle,
  content,
  children,
  portalClassName,
  ...props
}: PopoverProps & typeof defaultProps) => {
  const theme = useTheme()
  const titleNode = title && useMemo(() => getReactNode(title), [title])
  const textNode = useMemo(() => getReactNode(content), [content])

  return (
    <Tooltip
      portalClassName={`popover ${portalClassName}`}
      {...{
        ...props,
        text: (
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
        ),
      }}>
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

Popover.defaultProps = defaultProps
const PopoverComponent = Popover as typeof Popover & {
  Item: typeof PopoverItem
  Option: typeof PopoverItem
}
PopoverComponent.Item = PopoverItem
PopoverComponent.Option = PopoverItem

export default PopoverComponent
