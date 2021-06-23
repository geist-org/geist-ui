import React, { useEffect, useMemo, useState } from 'react'
import Tooltip, {
  TooltipOnVisibleChange,
  TooltipProps,
  TooltipTypes,
} from '../tooltip/tooltip'
import { Placement, TriggerTypes } from '../utils/prop-types'
import { getReactNode } from '../utils/collections'
import useScaleable, { withScaleable } from '../use-scaleable'
import { PopoverContext, PopoverConfig } from './popover-context'

export type PopoverTriggerTypes = TriggerTypes
export type PopoverPlacement = Placement
interface Props {
  content?: React.ReactNode | (() => React.ReactNode)
  trigger?: PopoverTriggerTypes
  placement?: Placement
  disableItemsAutoClose?: boolean
}

const defaultProps = {
  disableItemsAutoClose: false,
  trigger: 'click' as PopoverTriggerTypes,
  placement: 'bottom' as Placement,
  portalClassName: '',
  initialVisible: false,
  hideArrow: false,
  type: 'default' as TooltipTypes,
  enterDelay: 100,
  leaveDelay: 150,
  offset: 12,
  className: '',
  onVisibleChange: (() => {}) as TooltipOnVisibleChange,
}

type ExcludeTooltipProps = {
  type: any
  text: any
  trigger: any
  placement: any
}

export type PopoverProps = Props & Omit<TooltipProps, keyof ExcludeTooltipProps>

const PopoverComponent: React.FC<React.PropsWithChildren<PopoverProps>> = ({
  content,
  children,
  trigger,
  placement,
  initialVisible,
  portalClassName,
  disableItemsAutoClose,
  onVisibleChange,
  visible: customVisible,
  ...props
}: React.PropsWithChildren<PopoverProps> & typeof defaultProps) => {
  const { SCALES } = useScaleable()
  const [visible, setVisible] = useState<boolean>(initialVisible)
  const textNode = useMemo(() => getReactNode(content), [content])
  const onChildClick = () => {
    onPopoverVisibleChange(false)
  }
  const value = useMemo<PopoverConfig>(
    () => ({
      onItemClick: onChildClick,
      disableItemsAutoClose,
    }),
    [disableItemsAutoClose],
  )
  const onPopoverVisibleChange = (next: boolean) => {
    setVisible(next)
    onVisibleChange(next)
  }

  useEffect(() => {
    if (customVisible === undefined) return
    onPopoverVisibleChange(customVisible)
  }, [customVisible])
  return (
    <PopoverContext.Provider value={value}>
      <Tooltip
        text={textNode}
        trigger={trigger}
        placement={placement}
        portalClassName={`popover ${portalClassName}`}
        visible={visible}
        onVisibleChange={onPopoverVisibleChange}
        {...props}>
        {children}
        <style jsx>{`
          :global(.tooltip-content.popover > .inner) {
            padding: ${SCALES.pt(0.9)} ${SCALES.pr(0)} ${SCALES.pb(0.9)} ${SCALES.pl(0)};
          }
        `}</style>
      </Tooltip>
    </PopoverContext.Provider>
  )
}

PopoverComponent.defaultProps = defaultProps
PopoverComponent.displayName = 'GeistPopover'
const Popover = withScaleable(PopoverComponent)
export default Popover
