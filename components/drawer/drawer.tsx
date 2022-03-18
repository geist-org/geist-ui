import React, { MouseEvent, useEffect, useState } from 'react'
import { withScale } from '../use-scale'
import usePortal from '../utils/use-portal'
import useBodyScroll from '../utils/use-body-scroll'
import useKeyboard, { KeyCode } from '../use-keyboard'
import { createPortal } from 'react-dom'
import Backdrop from '../shared/backdrop'
import { DrawerPlacement } from './helper'
import DrawerWrapper from './drawer-wrapper'

interface Props {
  visible?: boolean
  keyboard?: boolean
  disableBackdropClick?: boolean
  onClose?: () => void
  onContentClick?: (event: MouseEvent<HTMLElement>) => void
  wrapClassName?: string
  placement?: DrawerPlacement
}

const defaultProps = {
  wrapClassName: '',
  keyboard: true,
  disableBackdropClick: false,
  placement: 'right' as DrawerPlacement,
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type DrawerProps = Props & NativeAttrs

const DrawerComponent: React.FC<React.PropsWithChildren<DrawerProps>> = ({
  visible: customVisible,
  keyboard,
  disableBackdropClick,
  onClose,
  onContentClick,
  wrapClassName,
  children,
  ...props
}: React.PropsWithChildren<DrawerProps> & typeof defaultProps) => {
  const portal = usePortal('drawer')
  const [visible, setVisible] = useState<boolean>(false)
  const [, setBodyHidden] = useBodyScroll(null, { delayReset: 300 })

  const closeDrawer = () => {
    onClose && onClose()
    setVisible(false)
    setBodyHidden(false)
  }

  useEffect(() => {
    if (typeof customVisible === 'undefined') return
    setVisible(customVisible)
    setBodyHidden(customVisible)
  }, [customVisible])

  const { bindings } = useKeyboard(
    () => {
      keyboard && closeDrawer()
    },
    KeyCode.Escape,
    {
      disableGlobalEvent: true,
    },
  )

  const closeFromBackdrop = () => {
    if (disableBackdropClick) return
    closeDrawer()
  }

  if (!portal) return null
  return createPortal(
    <Backdrop
      onClick={closeFromBackdrop}
      onContentClick={onContentClick}
      visible={visible}
      width="100%"
      {...bindings}>
      <DrawerWrapper visible={visible} className={wrapClassName} {...props}>
        {children}
      </DrawerWrapper>
    </Backdrop>,
    portal,
  )
}

DrawerComponent.defaultProps = defaultProps
DrawerComponent.displayName = 'GeistDrawer'
const Drawer = withScale(DrawerComponent)
export default Drawer
